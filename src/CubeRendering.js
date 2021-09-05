import {Scene, PerspectiveCamera, WebGLRenderer, Color, TorusGeometry, Mesh, MeshBasicMaterial, Raycaster, Vector2} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {createFullCube, getName, getSubName} from './CubeCreation';
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
var nextTurnLocation = getSubName([1,1,1]);

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

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();

  renderer.render( scene, camera );

  useEffect(() => {

    window.addEventListener('mousemove', (e) => updateMouseRay(e)); 
    window.addEventListener('keyup', (e) => handleButtonPress(e)); 
    
  }, []);
  const updateMouseRay = (event ) => {
    const updatedRay = new Vector2;
    updatedRay.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    updatedRay.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    mouseRay = updatedRay;
  }


  const handleButtonPress = (event) => {
    if (event.code === "Space"){
      rayCaster.setFromCamera( mouseRay, camera );
      const targetedCubes = rayCaster.intersectObjects( allCubes );

      if (targetedCubes.length === 0){
        return false;
      }
      const targetCube = targetedCubes[0];

      const targetSubcubeId = ((targetCube.object.name - (targetCube.object.name % 27)) / 27);

      if(nextTurnLocation === targetSubcubeId){

        toggleCube(targetCube);

        setSubcubeColor(nextTurnLocation, "#ababab");
        nextTurnLocation = (targetCube.object.name % 27);
        setSubcubeColor(nextTurnLocation, "#94f77e");

      }
    }
  }

  const toggleCube = (cube) => {
    if (currentTurn == "Blue"){
      cube.object.material.color.set( 0x0000ff );
      currentTurn = ("Red");
    } else {
      cube.object.material.color.set( 0xff0000 );
      currentTurn = ("Blue"); 
    }
  }

  const setSubcubeColor = (subCube, color) => {
    for (var i = 0; i < 27; i ++){
      var currentColor = allCubes[i + (subCube * 27)].material.color.getHex();
      if (currentColor === 11250603 || currentColor === 9762686){
        allCubes[i + (subCube * 27)].material.color.set(color);
      }
    }
  }  
  
  return (
    <>
    </>
  )
}