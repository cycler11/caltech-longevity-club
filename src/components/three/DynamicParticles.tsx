"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js'
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js'
import { FocusShader } from 'three/addons/shaders/FocusShader.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const DynamicParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let camera: THREE.PerspectiveCamera
    let scene: THREE.Scene
    let renderer: THREE.WebGLRenderer
    let composer: EffectComposer
    let parent: THREE.Object3D
    const clock = new THREE.Clock()
    const meshes: any[] = []
    const clonemeshes: any[] = []

    function createMesh(positions: THREE.BufferAttribute, scene: THREE.Scene, scale: number, x: number, y: number, z: number, color: number) {
      const geometry = new THREE.BufferGeometry()
      const positionAttribute = positions.clone()
      positionAttribute.setUsage(THREE.DynamicDrawUsage)
      geometry.setAttribute('position', positionAttribute)
      geometry.setAttribute('initialPosition', positions.clone())

      // Reduced to just one position
      const clonePositions = [
        [0, 0, 0]
      ]

      for (let i = 0; i < clonePositions.length; i++) {
        const mesh = new THREE.Points(
          geometry, 
          new THREE.PointsMaterial({ 
            size: 4,  // Smaller particles
            color: color,
            sizeAttenuation: true,  // Scale with distance
            transparent: true,
            opacity: 0.8
          })
        )
        mesh.scale.set(scale, scale, scale)
        mesh.position.set(x + clonePositions[i][0], y + clonePositions[i][1], z + clonePositions[i][2])
        parent.add(mesh)
        clonemeshes.push({ mesh, speed: 0.5 + Math.random() })
      }

      meshes.push({
        mesh: clonemeshes[clonemeshes.length - 1].mesh,
        verticesDown: 0,
        verticesUp: 0,
        direction: 0,
        speed: 15,
        delay: Math.floor(200 + 200 * Math.random()),
        start: Math.floor(100 + 200 * Math.random()),
      })
    }

    function combineBuffer(model: THREE.Object3D, bufferName: string) {
      let count = 0
      model.traverse((child: any) => {
        if (child.isMesh) {
          const buffer = child.geometry.attributes[bufferName]
          count += buffer.array.length
        }
      })

      const combined = new Float32Array(count)
      let offset = 0

      model.traverse((child: any) => {
        if (child.isMesh) {
          const buffer = child.geometry.attributes[bufferName]
          combined.set(buffer.array, offset)
          offset += buffer.array.length
        }
      })

      return new THREE.BufferAttribute(combined, 3)
    }

    const init = () => {
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000104)
      scene.fog = new THREE.FogExp2(0x000104, 0.0000675)

      camera = new THREE.PerspectiveCamera(
        20,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        1,
        50000
      )
      camera.position.set(0, 300, 1000)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
      renderer.autoClear = false
      renderer.setAnimationLoop(animate)
      containerRef.current!.appendChild(renderer.domElement)

      parent = new THREE.Object3D()
      scene.add(parent)

      // Add grid
      const grid = new THREE.Points(
        new THREE.PlaneGeometry(15000, 15000, 64, 64),
        new THREE.PointsMaterial({ color: 0xff5500, size: 10 })
      )
      grid.position.y = -400
      grid.rotation.x = -Math.PI / 2
      parent.add(grid)

      const loader = new OBJLoader()

      // Create simple geometry if model fails to load
      const fallbackGeometry = new THREE.SphereGeometry(100, 32, 32)
      const fallbackPositions = new THREE.BufferAttribute(
        fallbackGeometry.attributes.position.array,
        3
      )

      // Load models and create particle systems
      loader.load('/models/obj/male02/male02.obj', 
        (object) => {
          console.log('Male model loaded successfully:', object)
          const positions = combineBuffer(object, 'position')
          console.log('Male positions:', positions)
          // Adjust positions to be more visible
          createMesh(positions, scene, 4.05, -200, 0, 0, 0xff7744)  // Left
          createMesh(positions, scene, 4.05, 200, 0, 0, 0xff5522)   // Right
        },
        (progress) => {
          console.log('Loading male model:', (progress.loaded / progress.total * 100) + '%')
        },
        (error) => {
          console.error('Error loading male model:', error)
          createMesh(fallbackPositions, scene, 4.05, -200, 0, 0, 0xff7744)
        }
      )

      // Female model
      loader.load('/models/obj/female02/female02.obj',
        (object) => {
          const positions = combineBuffer(object, 'position')
          // Center position
          createMesh(positions, scene, 4.05, 0, 0, 0, 0xffffff)
        },
        undefined,
        () => {
          console.error('Failed to load female model')
        }
      )

      // Setup post-processing
      const renderPass = new RenderPass(scene, camera)
      const bloomPass = new BloomPass(0.75)
      const filmPass = new FilmPass()
      const focusPass = new ShaderPass(FocusShader)
      const outputPass = new OutputPass()

      // Set focus shader uniforms
      focusPass.uniforms['screenWidth'].value = containerRef.current!.clientWidth * window.devicePixelRatio
      focusPass.uniforms['screenHeight'].value = containerRef.current!.clientHeight * window.devicePixelRatio

      composer = new EffectComposer(renderer)
      composer.addPass(renderPass)
      composer.addPass(bloomPass)
      composer.addPass(filmPass)
      composer.addPass(focusPass)
      composer.addPass(outputPass)

      window.addEventListener('resize', handleResize)
    }

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      composer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    const animate = () => {
      const delta = Math.min(10 * clock.getDelta(), 2)
      parent.rotation.y += -0.02 * delta

      for (const cm of clonemeshes) {
        cm.mesh.rotation.y += -0.1 * delta * cm.speed
      }

      for (const data of meshes) {
        const positions = data.mesh.geometry.attributes.position
        const initialPositions = data.mesh.geometry.attributes.initialPosition

        if (data.start > 0) {
          data.start -= 1
        } else {
          if (data.direction === 0) {
            data.direction = -1
          }
        }

        for (let i = 0; i < positions.count; i++) {
          const px = positions.getX(i)
          const py = positions.getY(i)
          const pz = positions.getZ(i)

          // falling down
          if (data.direction < 0) {
            if (py > 0) {
              positions.setXYZ(
                i,
                px + 1.5 * (0.50 - Math.random()) * data.speed * delta,
                py + 3.0 * (0.25 - Math.random()) * data.speed * delta,
                pz + 1.5 * (0.50 - Math.random()) * data.speed * delta
              )
            } else {
              data.verticesDown += 1
            }
          }

          // rising up
          if (data.direction > 0) {
            const ix = initialPositions.getX(i)
            const iy = initialPositions.getY(i)
            const iz = initialPositions.getZ(i)

            const dx = Math.abs(px - ix)
            const dy = Math.abs(py - iy)
            const dz = Math.abs(pz - iz)

            const d = dx + dy + dz

            if (d > 1) {
              positions.setXYZ(
                i,
                px - (px - ix) / dx * data.speed * delta * (0.85 - Math.random()),
                py - (py - iy) / dy * data.speed * delta * (1 + Math.random()),
                pz - (pz - iz) / dz * data.speed * delta * (0.85 - Math.random())
              )
            } else {
              data.verticesUp += 1
            }
          }
        }

        // all vertices down
        if (data.verticesDown >= positions.count) {
          if (data.delay <= 0) {
            data.direction = 1
            data.speed = 5
            data.verticesDown = 0
            data.delay = 320
          } else {
            data.delay -= 1
          }
        }

        // all vertices up
        if (data.verticesUp >= positions.count) {
          if (data.delay <= 0) {
            data.direction = -1
            data.speed = 15
            data.verticesUp = 0
            data.delay = 120
          } else {
            data.delay -= 1
          }
        }

        positions.needsUpdate = true
      }

      composer.render(0.01)
    }

    init()

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.setAnimationLoop(null)
      composer.dispose()
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      meshes.forEach(data => {
        data.mesh.geometry.dispose()
        ;(data.mesh.material as THREE.Material).dispose()
      })
      clonemeshes.forEach(cm => {
        cm.mesh.geometry.dispose()
        ;(cm.mesh.material as THREE.Material).dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" style={{ position: 'absolute', inset: 0 }} />
}

export default DynamicParticles 