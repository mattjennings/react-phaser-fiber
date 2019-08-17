export default function applyArcadePhysicsProps(
  instance: Phaser.Physics.Arcade.Image | Phaser.Physics.Arcade.Sprite,
  oldProps: any,
  newProps: any
) {
  // Acceleration
  const newAccleration = convertToPoint(newProps.acceleration)
  if (!pointsAreEqual(convertToPoint(oldProps.acceleration), newAccleration)) {
    instance.setAcceleration(newAccleration.x, newAccleration.y)
  }

  // Angular
  if (oldProps.angularAcceleration !== newProps.angularAcceleration) {
    instance.setAngularAcceleration(newProps.angularAcceleration)
  }

  if (oldProps.angularDrag !== newProps.angularDrag) {
    instance.setAngularDrag(newProps.angularDrag)
  }

  if (oldProps.angularVelocity !== newProps.angularVelocity) {
    instance.setAngularDrag(newProps.angularVelocity)
  }

  // Bounce
  const bounce = convertToPoint(newProps.bounce)
  if (!pointsAreEqual(convertToPoint(oldProps.bounce), bounce)) {
    instance.setBounce(bounce.x, bounce.y)
  }

  if (oldProps.collideWorldBounds !== newProps.collideWorldBounds) {
    instance.setCollideWorldBounds(newProps.collideWorldBounds)
  }

  // Debug
  if (
    oldProps.debugShowBody !== newProps.debugShowBody ||
    oldProps.debugShowVelocity !== newProps.debugShowVelocity ||
    oldProps.debugBodyColor !== newProps.debugBodyColor
  ) {
    instance.setDebug(
      newProps.debugShowBody,
      newProps.debugShowVelocity,
      newProps.debugBodyColor
    )
  }

  // Drag
  if (oldProps.damping !== newProps.damping) {
    instance.setDamping(newProps.damping)
  }

  const drag = convertToPoint(newProps.drag)
  if (!pointsAreEqual(convertToPoint(oldProps.drag), drag)) {
    instance.setDrag(drag.x, drag.y)
  }

  // Enable
  if (
    oldProps.disableBody !== newProps.disableBody ||
    oldProps.hideBody !== newProps.hideBody
  ) {
    instance.disableBody(newProps.disableBody, newProps.hideBody)
  }

  // Friction
  const friction = convertToPoint(newProps.friction)
  if (!pointsAreEqual(convertToPoint(oldProps.friction), friction)) {
    instance.setFriction(friction.x, friction.y)
  }

  // Gravity
  const gravity = convertToPoint(newProps.gravity)
  if (!pointsAreEqual(convertToPoint(oldProps.gravity), gravity)) {
    instance.setGravity(gravity.x, gravity.y)
  }

  // Immovable
  if (oldProps.immovable !== newProps.immovable) {
    instance.setImmovable(newProps.immovable)
  }

  // Mass
  if (oldProps.mass !== newProps.mass) {
    instance.setMass(newProps.mass)
  }

  // Size
  if (newProps.circle) {
    if (
      !oldProps.circle ||
      (oldProps.circle.radius !== newProps.circle.radius ||
        oldProps.circle.offsetX !== newProps.circle.offsetX ||
        oldProps.circle.offsetY !== newProps.circle.offsetY)
    ) {
      instance.setCircle(
        newProps.circle.radius,
        newProps.circle.offsetX,
        newProps.circle.offsetY
      )
    }
  }

  if (newProps.offset) {
    if (
      !oldProps.offset ||
      (oldProps.offset.x !== newProps.offset.x ||
        oldProps.offset.y !== newProps.offset.y)
    ) {
      instance.setOffset(newProps.offset.x, newProps.offset.y)
    }
  }

  if (newProps.size) {
    if (
      !oldProps.size ||
      (oldProps.size.width !== newProps.size.width ||
        oldProps.size.height !== newProps.size.height ||
        oldProps.size.center !== newProps.size.center)
    ) {
      instance.setSize(
        newProps.size.width,
        newProps.size.height,

        // @ts-ignore - a 3rd argument supposedly exists https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Size.html#setSize__anchor
        newProps.size.center
      )
    }
  }

  // Velocity
  const velocity = convertToPoint(newProps.velocity)
  if (!pointsAreEqual(convertToPoint(oldProps.velocity), velocity)) {
    instance.setVelocity(velocity.x, velocity.y)
  }

  const maxVelocity = convertToPoint(newProps.maxVelocity)
  if (!pointsAreEqual(convertToPoint(oldProps.maxVelocity), maxVelocity)) {
    instance.setMaxVelocity(maxVelocity.x, maxVelocity.y)
  }
}

function convertToPoint(num: number | { x: number; y: number }) {
  if (typeof num === 'number') {
    return { x: num, y: num }
  }

  if (!num) {
    return { x: 0, y: 0 }
  }

  return num
}

function pointsAreEqual(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return p1.x === p2.x && p1.y === p2.y
}
