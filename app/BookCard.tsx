import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  _id: string,
  title: string,
  image_url: string,
}

const BookCard = ({ _id, title, image_url }: Props) => {
  return (
    <div className="rounded-xl bg-[#333] p-2 text-white w-[260px]">
      <Image
        src={image_url}
        alt={""}
        width={260}
        height={260}
        className='w-[260px] h-[260px]'
      />
      <div className='my-4 font-bold text-[1.15rem]'>
        <Link href={`/books/${_id}`}>
          <p>{title}</p>
        </Link>
      </div>
    </div>
  )
}

export default BookCard
