settings.controls = JSON.parse(fs.readFileSync("./settings/defaultInputs.json", 'utf8'));

LoadJS("engine/structures.js");
LoadJS("engine/saveSystem.js");
LoadJS("engine/display.js");
LoadJS("engine/classes/object.js");
LoadJS("engine/classes/inputHandler.js");
var control = new InputManager
LoadJS("engine/classes/controller.js")
LoadJS("engine/classes/actor.js");
new FloorTileActor
new PlayerController
