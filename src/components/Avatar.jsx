import React, { useEffect ,useRef,useMemo} from 'react'
import { useGraph } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Avatar({ currentAction, ...props }) {
  const group = useRef()

  // Load GLB model
  const { scene } = useGLTF("/models/689dfbbe19b4a3fa54c21bb3.glb")
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  // Load animations
  const idle = useFBX("/animations/Standing W_Briefcase Idle.fbx")
  const sittingLaugh = useFBX("/animations/Sitting Laughing.fbx")
  const bow = useFBX("/animations/Bow.fbx")

  idle.animations[0].name = "Idle"
  sittingLaugh.animations[0].name = "SittingLaugh"
  bow.animations[0].name = "Bow"

  const animations = [idle.animations[0], sittingLaugh.animations[0], bow.animations[0]]
  const { actions } = useAnimations(animations, group)

  // Switch animations when prop changes
  useEffect(() => {
    if (!actions || !currentAction) return

    // fade out old actions
    Object.values(actions).forEach((a) => a?.fadeOut(0.2))

    const action = actions[currentAction]
    if (action) {
      action.reset().fadeIn(1).play()
    }

    return () => {
      action?.reset().fadeOut(0.5)
    }
  }, [currentAction, actions])

  const { nodes, materials } = useGraph(clone)

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI/2}>
        <primitive object={nodes.Hips} />
            <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload("/models/689dfbbe19b4a3fa54c21bb3.glb")
