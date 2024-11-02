import React from 'react'
import { Separator } from '../ui/separator'
import Image from 'next/image'

const CartItem = ({ image, name, dimension, price, quantity, index}) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 px-2 flex flex-row gap-3">
        <Image width={100} height={0} alt={name} src={image}/>
       

      </div>
      <Separator className="bg-neutral-300"/>

    </div>
  )
}

export default CartItem