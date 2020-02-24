import Reconciler from 'react-reconciler'
import pkg from '../../package.json'
import hostconfig from './hostconfig'

export const PhaserFiber = Reconciler(hostconfig as any)
export const VERSION = pkg.version
export const PACKAGE_NAME = pkg.name
export * from './props'

// export { createPhaserComponent } from './element'
