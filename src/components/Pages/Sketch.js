import React, { useState } from 'react';
import Sketch from 'react-p5';
import '../../App.css';

const MySketch = ({index}) =>{
    
    let my_rects = [];
    let my_robots;
    let x_axis = 20;
    let y_axis = 20;
    let m = false;
    // start the msg selection
    let msg = ["0 0 NORTH A",
               "7 3 NORTH RAALAL",
               "0 0 NORTH L",
               "0 0 NORTH R",
               "0 0 NORTH AAAALAAAALAAAALAAAAL"
              ]
    let axis = ["NORTH", "EAST", "SOUTH", "WEST"];
    let axis_index = 0;
    let msg_index = index;
            

    let directions = [];
    let dir_index = 0;
    let count = 0;


//------------------------------------------------------------------------------
// CANVAS SETUP FUNCTION
//------------------------------------------------------------------------------
const setup = (p5, canvasParentRef) => {
    // P5.js box size 
    p5.createCanvas(400, 400).parent(canvasParentRef)

    // Rectangle point position
    p5.rectMode(p5.CENTER);
    // Vector for points x y
    let spacing = p5.createVector(p5.width/x_axis, p5.height/y_axis);
    // Starting the canvas in a loop
    for(let x = 0; x < x_axis; x++ ){
        for(let y = 0; y < y_axis; y++ ){
          
            let rect_pos = p5.createVector(
            (spacing.x/2) + (spacing.x * x),
            (spacing.y/2) + (spacing.y * y))
            my_rects.push(new my_rect(p5, rect_pos, spacing));
        }
    }
    // Only one robot for us today 
    my_robots = new my_robot(p5, parseInt(msg[index][0]), parseInt(msg[index][2]), spacing);
    // Setting the direction option inside a array
    directions = [];
    if(msg[index][4] == "N") {

        axis_index = 0;
        for(let i = 10; i < msg[index].length; i++) directions.push(msg[index][i]);

    } else if(msg[index][4] == "E") {

        axis_index = 1;            
        for(let i = 9; i < msg[index].length; i++) directions.push(msg[index][i]);
    
    } else if(msg[index][4] == "S") {

        axis_index = 2;
        for(let i = 10; i < msg[index].length; i++) directions.push(msg[index][i]);
        
    } else if(msg[index][4] == "W") {

        axis_index = 3;
        for(let i = 9; i < msg[index].length; i++) directions.push(msg[index][i]);
        
    }
}
//------------------------------------------------------------------------------
// CANVAS DRAW FUNCTION
//------------------------------------------------------------------------------
    const draw = p5 => {
        //changing the background colour
        p5.background(255);

        for(let i = 0; i < my_rects.length; i++){

            my_rects[i].update(p5);
            my_rects[i].display(p5);
        }
        if(count%20 == 0){

        //"7 3 NORTH RAALAL"
        if(directions[dir_index] == 'A') m = true;
        else m = false; 
        if(directions[dir_index] == 'R') axis_index ++;
        if(directions[dir_index] == 'L') axis_index --;

        // //NORTH EAST SOUTH WEST
        if(axis_index < 0) axis_index = 3;
        else if(axis_index > 3) axis_index = 0;

        my_robots.update(p5, m, axis[axis_index]);

        if(dir_index > directions.length) dir_index = directions.length;
        else dir_index ++;
        }
        if(dir_index > directions.length) count = 1;
        else count ++;

        my_robots.draw(p5);
    }
//------------------------------------------------------------------------------
// ROBOT CLASS 
//------------------------------------------------------------------------------
    class my_robot  {
        constructor(p5, pos_x, pos_y, spacing){
            
            this.spacing = spacing;
            this.point_1 = p5.createVector(0,0);
            this.point_2 = p5.createVector(0,0);
            this.point_3 = p5.createVector(0,0);
            this.velocity = p5.createVector(0,0);
            this.pos = p5.createVector( p5.width/2+(pos_x*this.spacing.x), 
            p5.height/2+(pos_y*this.spacing.y));    
        }
        //------------------------------------------------------------------------------
        // ROBOT UPDATE 
        //------------------------------------------------------------------------------    
        update(p5, motion, direction){
        
        let x = (this.spacing.x);
        let y = (this.spacing.y);
        let x_off = this.spacing.x/2;
        let y_off = this.spacing.y/2;
    
        let space = p5.createVector(this.pos.x + this.spacing.x, 
                                this.pos.y + this.spacing.y);
    
    
        if(direction == "NORTH"){
            // NORTH
            if(motion) {
            this.pos.y -= this.spacing.y;
            space.y -= this.spacing.y; 
            }
            this.point_1 = p5.createVector(this.pos.x, space.y);
            this.point_2 = p5.createVector(space.x - x_off , this.pos.y);
            this.point_3 = p5.createVector(space.x, space.y);
        
            
        } else if(direction == "EAST"){
            // EAST
            if(motion) {
            this.pos.x += this.spacing.x;
            space.x += this.spacing.x;
            }
            
            this.point_1 = p5.createVector(this.pos.x, this.pos.y);
            this.point_2 = p5.createVector(this.pos.x, space.y);
            this.point_3 = p5.createVector(space.x, space.y -y_off);
            
    
        } else if(direction == "SOUTH"){
            // SOUTH
            if(motion) {
            this.pos.y += this.spacing.y;
            space.y += this.spacing.y;
            }
            this.point_1 = p5.createVector(this.pos.x, this.pos.y);
            this.point_2 = p5.createVector(space.x - x_off, space.y);
            this.point_3 = p5.createVector(space.x, this.pos.y);
            
    
        } else if(direction == "WEST"){
            // WEST
            if(motion) {
            this.pos.x -= this.spacing.x;
            space.x -= this.spacing.x;
            }
            this.point_1 = p5.createVector(space.x, this.pos.y);
            this.point_2 = p5.createVector(space.x, space.y);
            this.point_3 = p5.createVector(this.pos.x, space.y - y_off);
        
        } 
        }
        //------------------------------------------------------------------------------
        // ROBOT DRAW 
        //------------------------------------------------------------------------------    
        draw(p5){
            p5.fill(255, 160, 50);
            p5.noStroke();
            p5.triangle(this.point_1.x, this.point_1.y, 
                    this.point_2.x, this.point_2.y, 
                    this.point_3.x, this.point_3.y);
            p5.textSize(8);
            p5.fill(0);
            let x = this.point_1.x+this.spacing.x;
            let y = this.point_1.y+this.spacing.y;
            let pos_x = this.pos.x/this.spacing.x -10;
            let pos_y = this.pos.y/this.spacing.y -10;
            let info = "x: " + pos_x + " y: " + pos_y;
            p5.text(info, x, y);
        }
    }
//------------------------------------------------------------------------------
// GRID CLASS 
//------------------------------------------------------------------------------    
    class my_rect {
        
        constructor(p5, pos, spacing) {
            this.my_rect_pos = pos;
            this.my_spacing = spacing;
        }
        //------------------------------------------------------------------------------
        // GRID UPDATE 
        //------------------------------------------------------------------------------    
        update(p5){
    
        }
        //------------------------------------------------------------------------------
        // GRID DRAW 
        //------------------------------------------------------------------------------    
        display(p5) {
            p5.push();
            p5.fill(255, 255, 255, 255);
            p5.stroke(0, 10);
            p5.rect(this.my_rect_pos.x, this.my_rect_pos.y, this.my_spacing.x, this.my_spacing.y);
            p5.pop();
        }
    }
    return (
        <div>
          <Sketch setup={setup} draw={draw} />
        </div>
    );
}

export default MySketch