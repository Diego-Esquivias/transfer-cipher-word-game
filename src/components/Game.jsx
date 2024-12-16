import React from 'react'

const Game = () => {
    const sampleWord = 'nintendo'
    const sampleKey = '213'

    // const encyptWord = () => {
    //     // TODO: Implement encryption logic here

    // }

    // console.log(encyptedWord)
    if (sampleKey[0] === '2') {
      console.log(sampleWord)
    }
  return (
    <>
    <div className='game-container'>
      This is the game component

      <h1>Word: {sampleWord}</h1>
      <h1>Key: {sampleKey}</h1>

      <div className="grid">

      </div>
    </div>
    </>
  )
}

export default Game