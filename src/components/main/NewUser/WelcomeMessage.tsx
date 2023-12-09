import SignInBtn from './SignInBtn'

export default async function WelcomeMessage() {
  return (
    <div className="z-30 mt-12 basis-2/5 md:mt-32">
      <div>
        <p className="z-10 text-6xl text-center md:text-start text-main-pink">
          Dispute
        </p>
        <p className="mt-10 text-lg text-center mb-7 md:text-start ">
          Welcome to Dispute, a Discord clone! If you want to check the app, I
          do have to ask you to sign in though, since many of its features
          involve having a registered user. Sorry for the inconvinience!
        </p>
      </div>

      <div className="text-center md:text-start">
        <SignInBtn />
      </div>
    </div>
  )
}
