import { Dot } from 'lucide-react'

const features: Array<string> = [
  'Create and Manage your own Servers',
  'Invite Other People, and Join Other Servers',
  'Real-time Updates for a Smooth Conversation',
  'Text, Audio and Video Channels',
  'Give Roles to your Members',
  'Manage the Messages of your Channels',
  'And Many More!',
]

export default async function Features() {
  return (
    <div className="z-30 mt-12 basis-2/5 md:mt-32">
      <p className="z-10 mx-auto text-5xl text-center text-main-blue md:text-start">
        What Can I Expect?
      </p>

      <p className="mt-10 text-lg text-center mb-7 md:text-start text-main-pink ">
        All of Discord main features are here!
      </p>

      <div className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-row items-center ">
            <Dot size={48} strokeWidth={3} className="text-zinc-200" />
            <p className="text-lg ">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
