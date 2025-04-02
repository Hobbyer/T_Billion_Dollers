import axios from "axios"

export const GET = (url) => {
  return (
  axios.get(url, {headers : {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
)}

export const POST = (url, data) => {
  return (
  axios.post(url, data, {headers : {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
)}

export const PUT = (url, data) => {
  return (
  axios.put(url, data, {headers : {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
)}

export const DELETE = (url) => {
  return (
  axios.delete(url, {headers : {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
)}