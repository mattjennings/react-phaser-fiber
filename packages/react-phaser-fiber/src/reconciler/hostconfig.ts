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

import { createElement } from './element'
import { applyProps as defaultApplyProps } from './applyProps'

function appendChild(
  parent: Phaser.Scene | Phaser.GameObjects.GameObject,
  child: Phaser.GameObjects.GameObject
) {
  if (parent instanceof Phaser.Scene) {
    if (!parent.children.exists(child)) {
      parent.add.existing(child)
    }
  }

  if (parent instanceof Phaser.GameObjects.GameObject) {
    // todo
  }
}

function removeChild(parent: Phaser.Scene, child: any) {
  if (child.destroy) {
    child.destroy()
  }
}

function insertBefore(parent: Phaser.Scene, child: any, beforeChild: any) {
  invariant(
    child !== beforeChild,
    'PhaserFiber cannot insert node before itself'
  )

  if (parent instanceof Phaser.Scene) {
    const childExists = parent.children.exists(child)
    const index = parent.children.getIndex(beforeChild)

    childExists
      ? parent.children.moveTo(child, index)
      : parent.children.addAt(child, index)
  }
}

// get diff between 2 objects
// https://github.com/facebook/react/blob/97e2911/packages/react-dom/src/client/ReactDOMFiberComponent.js#L546
function diffProperties(
  phaserElement: any,
  type: any,
  lastProps: any,
  nextProps: any,
  rootContainerElement: any
) {
  let updatePayload: any = null

  for (let propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey) ||
      lastProps[propKey] == null
    ) {
      continue
    }
    if (propKey === 'children') {
      // Noop. Text children not supported
    } else {
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      if (!updatePayload) {
        updatePayload = []
      }
      updatePayload.push(propKey, null)
    }
  }

  for (let propKey in nextProps) {
    const nextProp = nextProps[propKey]
    const lastProp = lastProps != null ? lastProps[propKey] : undefined

    if (
      !nextProps.hasOwnProperty(propKey) ||
      nextProp === lastProp ||
      (nextProp == null && lastProp == null)
    ) {
      continue
    }

    if (propKey === 'children') {
      // Noop. Text children not supported
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      if (!updatePayload) {
        updatePayload = []
      }
      updatePayload.push(propKey, nextProp)
    }
  }

  return updatePayload
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

  createInstance: createElement,

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

  prepareUpdate(
    phaserElement: any,
    type: any,
    oldProps: any,
    newProps: any,
    rootContainerInstance: any,
    hostContext: any
  ) {
    return diffProperties(
      phaserElement,
      type,
      oldProps,
      newProps,
      rootContainerInstance
    )
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
    let applyProps = instance && instance.applyProps

    if (typeof applyProps !== 'function') {
      applyProps = defaultApplyProps
    }
    applyProps(instance, oldProps, newProps)
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
