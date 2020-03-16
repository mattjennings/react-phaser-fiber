/**
 * -------------------------------------------
 * Host Config file.
 *
 * See:
 *   https://github.com/facebook/react/tree/master/packages/react-reconciler
 *   https://github.com/facebook/react/blob/master/packages/react-reconciler/src/forks/ReactFiberHostConfig.custom.js
 * -------------------------------------------
 */

import invariant from 'fbjs/lib/invariant'
import performanceNow from 'performance-now'

import { TYPES, ELEMENTS } from './element'

interface InternalGameObjectProperties {
  __reactPhaser: { sceneKey: string }
}

type ParentType =
  | Phaser.Game
  | Phaser.GameObjects.GameObject
  | Phaser.GameObjects.Group

function appendChild(
  parent: ParentType,
  child: Phaser.GameObjects.GameObject & InternalGameObjectProperties
) {
  // __reactPhaser.sceneKey comes from GameObject's element creator
  if (parent instanceof Phaser.Game && child.__reactPhaser.sceneKey) {
    const scene = parent.scene.getScene(child.__reactPhaser.sceneKey)

    scene.add.existing(child)
  } else if (parent instanceof Phaser.GameObjects.Group) {
    parent.add(child, true)
  } else {
    invariant(
      true,
      `"${parent.constructor.name}" does not support child React components`
    )
  }
}

function removeChild(parent: ParentType, child: any) {
  if (child instanceof Phaser.GameObjects.Group) {
    child.destroy(true)
  } else if (child.destroy) {
    child.destroy()
  }
}

function insertBefore(
  parent: ParentType,
  child: Phaser.GameObjects.GameObject & InternalGameObjectProperties,
  beforeChild: Phaser.GameObjects.GameObject & InternalGameObjectProperties
) {
  invariant(
    child !== beforeChild,
    'PhaserFiber cannot insert node before itself'
  )

  if (parent instanceof Phaser.Game) {
    const scene = parent.scene.getScene(child.__reactPhaser.sceneKey)
    const childExists = scene.children.exists(child)
    const index = scene.children.getIndex(beforeChild)

    if (!childExists) {
      scene.add.existing(child)
    }
    scene.children.moveTo(child, index)
  } else if (parent instanceof Phaser.GameObjects.Group) {
    // untested
    parent.add(child, true)
  }
}

export default {
  getRootHostContext(rootContainerInstance: any) {
    return rootContainerInstance
  },

  getChildHostContext() {
    return {}
  },

  getChildHostContextForEventComponent(parentHostContext: any) {
    return parentHostContext
  },

  getPublicInstance(instance: any) {
    return instance
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  createInstance(type: keyof typeof TYPES, props: any = {}, root: Phaser.Game) {
    const { create, applyProps } = ELEMENTS[type]

    const instance = create(props, root)

    if (props.scene) {
      // @ts-ignore - we need to set the scene key so hostconfig knows which scene to add this instance to
      instance.__reactPhaser = {
        sceneKey: props.scene.scene.key,
        applyProps: applyProps.bind(instance),
      }
    }

    applyProps(instance, {}, props)

    return instance
  },
  hideInstance(instance: Phaser.GameObjects.GameObject) {
    if (instance.setActive) {
      instance.setActive(false)
    }
  },

  unhideInstance(instance: Phaser.GameObjects.GameObject, props: any) {
    const active =
      props !== undefined && props !== null && props.hasOwnProperty('active')
        ? props.active
        : true

    instance.setActive(active)
  },

  appendInitialChild: appendChild,

  finalizeInitialChildren(phaserElement: any, type: any, props: any) {
    return false
  },

  // https://github.com/facebook/react/blob/97e2911/packages/react-dom/src/client/ReactDOMFiberComponent.js#L546
  prepareUpdate(
    phaserElement: any,
    type: any,
    oldProps: any,
    newProps: any,
    rootContainerInstance: any,
    hostContext: any
  ) {
    let updatePayload: any = null

    for (const propKey in oldProps) {
      if (
        newProps.hasOwnProperty(propKey) ||
        !oldProps.hasOwnProperty(propKey) ||
        oldProps[propKey] == null
      ) {
        continue
      }
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      if (!updatePayload) {
        updatePayload = []
      }
      updatePayload.push(propKey, null)
    }

    for (const propKey in newProps) {
      const nextProp = newProps[propKey]
      const lastProp = oldProps != null ? oldProps[propKey] : undefined

      if (
        !newProps.hasOwnProperty(propKey) ||
        nextProp === lastProp ||
        (nextProp == null && lastProp == null)
      ) {
        continue
      }

      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      if (!updatePayload) {
        updatePayload = []
      }
      updatePayload.push(propKey, nextProp)
    }

    return updatePayload
  },

  shouldSetTextContent(type: any, props: any) {
    return false
  },

  shouldDeprioritizeSubtree(
    type: string,
    props: Phaser.GameObjects.GameObject
  ) {
    const isActive =
      typeof props.active === 'undefined' || props.active === true

    return !isActive
  },

  createTextInstance(
    text: any,
    rootContainerInstance: any,
    internalInstanceHandler: any
  ) {
    invariant(
      false,
      'react-phaser does not support text instances. Use `<Text /> component` instead.'
    )
  },

  mountEventComponent() {
    // noop
  },

  updateEventComponent() {
    // noop
  },

  handleEventTarget() {
    // noop
  },

  scheduleTimeout: setTimeout,

  cancelTimeout: clearTimeout,

  noTimeout: -1,

  warnsIfNotActing: false,

  now: performanceNow,

  isPrimaryRenderer: false,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false,

  /**
   * -------------------------------------------
   * Mutation
   * -------------------------------------------
   */

  appendChild,

  appendChildToContainer: appendChild,

  removeChild,

  removeChildFromContainer: removeChild,

  insertBefore,

  insertInContainerBefore: insertBefore,

  commitUpdate(
    instance: any,
    updatePayload: any,
    type: any,
    oldProps: any,
    newProps: any
  ) {
    const applyProps = instance?.__reactPhaser?.applyProps

    if (applyProps) {
      applyProps(instance, oldProps, newProps)
    }
  },

  commitMount(
    instance: any,
    updatePayload: any,
    type: any,
    oldProps: any,
    newProps: any
  ) {
    // noop
  },

  commitTextUpdate(textInstance: any, oldText: any, newText: any) {
    // noop
  },

  resetTextContent(phaserElement: any) {
    // noop
  },
}
