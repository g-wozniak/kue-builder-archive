import {StateAsyncProcess} from '@intf/State'
import {FormInputValues} from '@intf/Common'

export const isAsyncProcessResolved = (proc: StateAsyncProcess | undefined): boolean => proc?.lifecycle === 'completed'

export const isAsyncProcessTriggered = (proc: StateAsyncProcess | undefined): boolean => proc?.lifecycle === 'triggered'

export const getSlotAsWord = (slot: number): 'first' | 'second' | 'third' | '?' => {
   switch (slot) {
      case 1: {
         return 'first'
      }
      case 2: {
         return 'second'
      }
      case 3: {
         return 'third'
      }
      default:
         return '?'
   }
}

export const formDataSetter = (key: string, value: FormInputValues) => {
   return (prev) => ({...prev, [key]: value})
}