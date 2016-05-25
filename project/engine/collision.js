var collision = {};
collision.tileSize = 20;




/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function WorldToCollisionTile(location){
  location.x = parseInt(location.x/collision.tileSize);
  location.y = parseInt(location.y/collision.tileSize);
  return location;
}

function CollisionTileToWorld(tile){
  tile.x *= collision.tileSize;
  tile.y *= collision.tileSize;
  return tile;
};
