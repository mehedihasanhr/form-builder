import { CollisionDetection, Collision } from "@dnd-kit/core";

export const topPortionCollision: CollisionDetection = (args) => {
  const { active, collisionRect, droppableRects, droppableContainers } = args;

  // Only consider top 30% of the draggable item for collisions
  const activeTopPortion = {
    left: collisionRect.left,
    top: collisionRect.top,
    right: collisionRect.left + collisionRect.width,
    bottom: collisionRect.top + collisionRect.height * 0.5,
  };

  const collisions: Collision[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const droppableRect = {
        left: rect.left,
        top: rect.top,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height,
      };

      // Check if rectangles intersect
      if (
        activeTopPortion.left < droppableRect.right &&
        activeTopPortion.right > droppableRect.left &&
        activeTopPortion.top < droppableRect.bottom &&
        activeTopPortion.bottom > droppableRect.top
      ) {
        collisions.push({
          id,
          data: { droppableContainer },
        });
      }
    }
  }

  return collisions;
};
