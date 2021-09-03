import {Scene, PerspectiveCamera, WebGLRenderer, Color, TorusGeometry, Mesh, MeshBasicMaterial, Raycaster, Vector2} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {createFullCube, getName} from './CubeCreation';
import { useEffect, useState, useMemo } from "react";
import React from 'react'

//ThreeJS rendering initialization
const renderer = new WebGLRenderer();
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const rayCaster = new Raycaster();
const emptyCubes = createFullCube();
var currentTurn = "Blue";
var mouseRay = new Vector2();
const allCubes = [];
emptyCubes.children.map(cubeGroup => {
  cubeGroup.children.map(cube => {
    allCubes.push(cube);
  })
})

emptyCubes.rotation.x = 3.14 / 7;
camera.position.z = 50;
scene.add(emptyCubes);
scene.background = new Color('#f0ecc5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );


export const FullMatrixRender = () => {

  useEffect(() => {

    window.addEventListener('mousemove', (e) => updateMouseRay(e)); 
    window.addEventListener('keyup', (e) => handleButtonPress(e)); 
    
  }, []);

  function animate() {

    
    

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
  renderer.render( scene, camera );

  const updateMouseRay = (event ) => {

    const updatedRay = new Vector2;
    updatedRay.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    updatedRay.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    mouseRay = updatedRay;
  
  }

  const handleButtonPress = (event) => {

    if (event.code === "Space"){
      rayCaster.setFromCamera( mouseRay, camera );
      const intersects = rayCaster.intersectObjects( allCubes );
      if (intersects.length > 0){
        if (currentTurn == "Blue"){
          intersects[0].object.material.color.set( 0x0000ff );
          currentTurn = ("Red");
        } else {
          intersects[0].object.material.color.set( 0xff0000 );
          currentTurn = ("Blue"); 
        }
      }
    }

  }

  
  
  return (
    <>
    </>
  )
}