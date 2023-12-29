import Image from 'next/image'
import React from 'react'

type Props = {
  title: string,
  image_url: string,
}

const BookCard = ({ title, image_url }: Props) => {
  return (
    <div className="rounded-xl bg-[#333] p-2 text-white">
      <Image
        src={image_url}
        alt={""}
        width={260}
        height={260}
        className='w-[260px] h-[260px]'
      />
      <div className='my-4 font-bold text-[1.15rem]'>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default BookCard
