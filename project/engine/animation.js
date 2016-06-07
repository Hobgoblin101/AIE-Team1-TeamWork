LoadJS("engine/render.js");

var Animation = function(src, size){
  this.image = document.createElement("img");
  this.image.src = src;

  this.frameTime = 0;
  this.currentFrame = 0;
  this.animations = {};
  this.playing = null;
  this.sectionSize = new Vector2(size.x, size.y);
};

Animation.prototype.buildAnimation = function(name, row, frames, loop, frameDuration){
  if (typeof(loop) == "undefined"){
    loop = false;
  }
  if (typeof(frameDuration) != "number"){
    frameDuration = 1;
  }
  this.animations[name] = {};
  this.animations[name].row = row;
  this.animations[name].frames = frames;
  this.animations[name].loop = loop;
  this.animations[name].frameDuration = frameDuration;
};

Animation.prototype.play = function(animation, reset){
  if (typeof(reset) == "undefined"){
    reset = true;
  }
  if (reset && this.playing == animation){
    //Stop if it is already running the animation and it should not be reset
    return;
  }

  this.currentFrame = 0;
  this.frameTime = 0;
  if (typeof(this.animations[animation]) == "object"){
    this.playing = animation;
  }else{
    console.error("Animation: cannot find ("+animation+") in ("+this.src+")")
  }
};

Animation.prototype.update = function(location){
  if (this.playing == null || this.playing == undefined){
    //Draw defualt pose
    render.AddRender(0, {
      image: this.image,
      location: location,
      selection: {
        start: {
          x: 0,
          y: 0
        },
        width: this.sectionSize.x,
        height: this.sectionSize.y
      }
    });
    return "invalid"
  }

  this.frameTime += dt;

  if (typeof(this.animations[this.playing]) == "object"){
    //Update current drawing frame
    if (this.frameTime >= this.animations[this.playing].frameDuration){
      this.frameTime = 0;
      this.currentFrame += 1;
    }
    //Detect if it has finished the animation
    if (this.currentFrame >= this.animations[this.playing].frames){
      if (typeof(this.onEndAnimation) == "function"){
        this.onEndAnimation();
      }
      if (this.animations[this.playing].loop == true){
        this.currentFrame = 0;
      }else{
        this.playing = null;
      }
    }

    //Draw animation
    render.AddRender(0, {
      image: this.image,
      location: {x: location.x, y: location.y},
      selection: {
        start: {
          x: this.currentFrame*this.sectionSize.x,
          y: this.animations[this.playing].row*this.sectionSize.y
        },
        width: this.sectionSize.x,
        height: this.sectionSize.y
      }
    });
  }else{
    console.error("Animation: Invalid animation to play (", this.animations[this.playing], ")");
  }
};
