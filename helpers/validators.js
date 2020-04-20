import { notNullandUndefined } from './someHelpers'

export const isInvalidDate = (dateStr) => {
  return (new Date(dateStr) + '') === 'Invalid Date'
}

export const isObject = (val) => {
  return notNullandUndefined(val) && typeof val === 'object' && !Array.isArray(val)
}

export const isString = (val) => {
  return notNullandUndefined(val) && typeof val === 'string'
}

export const isArray = (val) => {
  return notNullandUndefined(val) && Array.isArray(val)
}

export const isClient = () => {
  return !(typeof window === 'undefined')
}

export const isEmpty = (target) => {
  return (typeof target === 'object' && !Array.isArray(target) && Object.keys(target).length === 0)
}

export const isEqDateObj = (target, obj) => {
  return target.year === obj.year && target.mounth === obj.mounth && target.day === obj.day
}
