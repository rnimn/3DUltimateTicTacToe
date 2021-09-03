import {BoxGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

//Create 3x3 set of cubes
const createSubCube = (xOffset, yOffset, zOffset, localName) => {

    const geometry = new BoxGeometry(1, 1, 1);
    const subCube = new Group();
    
    for (let row = 0; row < 3; row ++){
        for (let column = 0; column < 3; column++){
            for (let cell = 0; cell < 3; cell++){

                var material = new MeshBasicMaterial( { color: "#ababab" , transparent: true, opacity: "0.5"} );

                var cube = new Mesh( geometry, material );
                cube.position.set((row - 1)*1.5 + xOffset, (column - 1)*1.5 + yOffset, (cell - 1)*1.5 + zOffset);
                cube.name = getSubName([row, column, cell]) + (localName * 27);

                subCube.add(cube);
            }
        }
    }

    return(subCube);

}


//Create 3x3 set of 3x3 sets of cubes
export const createFullCube = () => {
    
    const fullMatrix = new Group();
    
    for (let row = 0; row < 3; row ++){
        for (let column = 0; column < 3; column++){
            for (let cell = 0; cell < 3; cell++){

                var localName = getSubName([row, column, cell]);
                var smallCubes = createSubCube((row - 1)*7, (column - 1)*7, (cell - 1)*7, localName);
                fullMatrix.add(smallCubes);

            }
        }
    }

    return(fullMatrix);

}

//Map coordinates of 9x9x9 cubes to integer id from 1-729
//Takes coordinates of sub cube, coordinates of individual cube
export const getName = (largeCoords, smallCords)=> {

    var id = (largeCoords[0] * 9 + largeCoords[1] * 3 + largeCoords[2]) * 27; 
    id += (smallCords[0] * 9 + smallCords[1] * 3 + smallCords[2]);
    return(id);

}

//Map coordinates of 3x3x3 cubes to integer id from 1-27
const getSubName = (coords) => {

    const id = coords[0] * 9 + coords[1] * 3 + coords[2]; 
    return(id)

}