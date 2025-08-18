import React, { useEffect, useRef, useMemo } from "react"
import { useGraph, useThree } from "@react-three/fiber"
import { useAnimations, useFBX, useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three-stdlib"
import { useControls } from "leva"

export function Avatar({ currentAction, onClick, ...props }) {
  const group = useRef()

  // ✅ Leva controls (real-time tweakable)
  // const { position, rotation, scale } = useControls("Avatar", {
  //   position: { value: [1, -1.7, 3], step: 0.1 },
  //   rotation: { value: [-0.4, 0, 0], step: 0.1 },
  //   scale: { value: 1, min: 0.1, max: 5, step: 0.1 },
  // })

  // Load GLB model
  const { scene } = useGLTF("/models/689dfbbe19b4a3fa54c21bb3.glb")
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { camera } = useThree()

  console.log("camera", camera.position)

  // Load animations
  const idle = useFBX("/animations/Standing W_Briefcase Idle.fbx")
  const sittingLaugh = useFBX("/animations/Sitting Laughing.fbx")
  const bow = useFBX("/animations/Bow.fbx")
 const kick=useFBX("/animations/Kicking.fbx")
//  const praying=useFBX("/animations/Praying.fbx")
 const flip=useFBX("/animations/Sword And Shield Attack.fbx")

 kick.animations[0].name="kick"
  idle.animations[0].name = "Idle"
  sittingLaugh.animations[0].name = "SittingLaugh"
  bow.animations[0].name = "Bow"
  // praying.animations[0].name = "praying"
  flip.animations[0].name = "flip"

  const animations = [
    idle.animations[0],
    sittingLaugh.animations[0],
    bow.animations[0],
    kick.animations[0],
    // praying.animations[0],
    // flip.animations[0],
  ]
  const { actions } = useAnimations(animations, clone)

  // Switch animations
  useEffect(() => {
    const action = actions[currentAction]
    if (action) {
      action.reset().fadeIn(0.5).play()
    }
    return () => {
      action?.fadeOut(0.5)
    }
  }, [currentAction, actions])

  const { nodes, materials } = useGraph(clone)

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[-2.8755575615628914e-17,-3.1000000000000005,1.2999999999999974]}
      rotation={[-0.4,0,0]}
      scale={2.4000000000000004}
    >
      <primitive object={clone} onClick={onClick} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload("/models/689dfbbe19b4a3fa54c21bb3.glb")
