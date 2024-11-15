import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {
    const router = useRouter();
    const onStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }
    const onFeedback = () => { 
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }
  return (
      <div className='border shadow-sm rounded-lg p-3'>
          <h2 className='font-bold text-lg text-primary'>{interview?.jobPosition} </h2>
          <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Years of Experience </h2>
          <br></br>
          <h2 className='text-xs text-gray-400'>Created At: {interview.createdAt} </h2>
          <div className='flex justify-between mt-2 gap-5'>
              <Button size='sm' variant='outline' className='w-full font-sans' onClick={onFeedback}>Feedback</Button>
              <Button size='sm' className='w-full font-sans' onClick={onStart}>Start</Button>
          </div>
    </div>
  )
}

export default InterviewItemCard