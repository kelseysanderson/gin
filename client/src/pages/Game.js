import React, { useState } from "react";
import io from "socket.io-client"
import "./Game.css"


const socket = io("localhost:3002", { transports: ["websocket"] })

//DECK BUILDER
class Deck {
  constructor() {
    this.deck = [];

    const suits = ['\u2665', '\u2660', '\u2663', '\u2666'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, ]
      // 8, 9, 10, 11, 12, 13];

   suits.forEach(suitVal => {
     numbers.forEach(numberVal => {
       let displayVal = numberVal
       if (numberVal === 1) {displayVal = "ace"}
       if (numberVal === 11) {displayVal = "jack"}
       if (numberVal === 12) {displayVal = "queen"}
       if (numberVal === 13) {displayVal = "king"}
       this.deck.push({
         suit: suitVal,
         number: numberVal,
         display: displayVal,
        })
     })
   })
  }
}

//GAME FUNCTION
function Game() {
  //GAME STATE
  const [gameState, setGameState] = useState({
    deck: [],
    discard : [],
    ended: false,
    finalResult: "",

    p1Turn: false,
    p1MustDiscard: false,
    p1DeclaredGin: false,
    p1DecalerdKnock: false,
    p1HasKnock: false,
    p1HasGin: false,
    p1Score: 0,
    
    p2Turn: false,
    p2MustDiscard: false,
    p2DeclaredGin: false,
    p2DecalerdKnock: false,
    p2HasKnock: false,
    p2HasGin: false,
    p2Score: 0
  })

  function updateState (newState) {
    socket.emit('update_state', newState)
  }

  socket.on('update_state', function(newState){
    setGameState(newState)
  })

  //PLAYER ONE CARDS STATE
  const [playerOne, setPlayerOne] = useState ({
    hand: [],
    sets: [[],[],[],[]],
  })

  function updatePlayerOne (newPlayerOne) {
    socket.emit('update_playerOne', newPlayerOne)
  }

  socket.on('update_playerOne', function(newPlayerOne){
    setPlayerOne(newPlayerOne)
  })

  //PLAYER TWO CARDS STATE
  const [playerTwo, setPlayerTwo] = useState ({
    hand: [],
    sets: [[],[],[],[]],
  })

  function updatePlayerTwo (newPlayerTwo) {
    socket.emit('update_playerTwo', newPlayerTwo)
  }

  socket.on('update_playerTwo', function(newPlayerTwo){
    setPlayerTwo(newPlayerTwo)
  })

  //CURRENT PLAYER
  const [playerState, setPlayerState] = useState(1)

  function switchPlayer() {
    if (playerState === 1){setPlayerState(2)}
    else {setPlayerState(1)}
  }

  var currentPlayer 
  if (playerState === 1) {
    currentPlayer = {
      hand: playerOne.hand,
      sets: playerOne.sets,

      turn: gameState.p1Turn,
      mustDiscard: gameState.p1MustDiscard,
      declaredGin: gameState.p1DeclaredGin,
      declaredKnock: gameState.p1DeclaredKnock,

      knockedAgainst: gameState.p2HasKnock,
      ginAgainst: gameState.p2HasGin
    } 
  }
  else {    
    currentPlayer = {
      hand: playerTwo.hand,
      sets: playerTwo.sets,

      turn: gameState.p2Turn,
      mustDiscard: gameState.p2MustDiscard,
      declaredGin: gameState.p2DeclaredGin,
      declaredKnock: gameState.p2DeclaredKnock,

      knockedAgainst: gameState.p1HasKnock,
      ginAgainst: gameState.p1HasGin
    } 
  }

  //DEAL
  function dealCards () {
    const newDeck = new Deck()
    const playerOneDealtHand = []
    const playerTwoDealtHand = []

    for (var i = 0; i < 10; i++) {
      let randomNumber = (Math.floor(Math.random()*newDeck.deck.length))
      let dealtCard = newDeck.deck.splice(randomNumber, 1)
      playerOneDealtHand.push(dealtCard[0])
    }  

    for (let i = 0; i < 10; i++) {
      let randomNumber = (Math.floor(Math.random()*newDeck.deck.length))
      let dealtCard = newDeck.deck.splice(randomNumber, 1)
      playerTwoDealtHand.push(dealtCard[0])
    }

    updateState({...gameState,
      deck: newDeck.deck,
      p2Turn: true
    })  
    updatePlayerOne({...playerOne,
      hand: playerOneDealtHand,
    })
    updatePlayerTwo({...playerTwo,
      hand: playerTwoDealtHand,
    })
  }

  //DRAW FROM DECK
  function deckDraw() {
    let randomNumber = (Math.floor(Math.random()*gameState.deck.length))
    let drawnCard = gameState.deck.splice(randomNumber, 1)[0]
    currentPlayer.hand.push(drawnCard)

    if (playerState === 1) {
      updateState({...gameState,
        deck: gameState.deck,
        p1MustDiscard: true 
      }) 
      updatePlayerOne({...playerOne,
        hand: currentPlayer.hand,
      }) 
    }

    if (playerState === 2) {
      updateState({...gameState,
        deck: gameState.deck, 
        p2MustDiscard: true, 
      }) 
      updatePlayerTwo({...playerTwo,
        hand: currentPlayer.hand,
      })  
    }
  }

  //DISCARD CARD
  function discardCard(event) {
    let discardedCard = currentPlayer.hand.splice(event.target.value, 1)[0]
    gameState.discard.unshift(discardedCard)

    if (playerState === 1) {
      updateState({...gameState,
        discard: gameState.discard,
        p1Turn: false,
        p1MustDiscard: false, 
        p2Turn: true,
      })  
      updatePlayerOne({...playerOne,
        hand: currentPlayer.hand,
      }) 
    }

    if (playerState === 2) { 
      updateState({...gameState,
        discard: gameState.discard, 
        p1Turn: true, 
        p2Turn: false,
        p2MustDiscard: false
      }) 
      updatePlayerTwo({...playerTwo,
        hand: currentPlayer.hand,
      })  
    }
  }

  //DRAW FROM DISCARD
  function drawDiscard() {
    let drawnCard = gameState.discard.splice(0,1)[0]
    console.log(drawnCard)
    currentPlayer.hand.push(drawnCard)
    console.log(currentPlayer.hand)

    if (playerState === 1) {
      updateState({...gameState,
        discard: gameState.discard,
        p1Hand: currentPlayer.hand,  
        p1MustDiscard: true, 
      })  
      updatePlayerOne({...playerOne,
        hand: currentPlayer.hand,
      }) 
    }

    if (playerState === 2) {
      updateState({...gameState,
        discard: gameState.discard,
        p2MustDiscard: true, 
      })  
      updatePlayerTwo({...playerTwo,
        hand: currentPlayer.hand,
      })  
    }
  }

  //HAND CARD SORT
  function moveLeft (event) {
    let index = parseInt(event.target.value)
    let cardMove= currentPlayer.hand.splice(index, 1)[0]

    if(index === 0) {
      currentPlayer.hand.push(cardMove)
    } else {
      currentPlayer.hand.splice(index - 1, 0, cardMove)
    }
    
    //ONLY UPDATE LOCALLY!!!
    if (playerState === 1) {
      setPlayerOne({...playerOne, hand: currentPlayer.hand})
    }
    else {
      setPlayerTwo({...playerTwo, hand: currentPlayer.hand})
    }
  }

  function moveRight (event) {
    let index = parseInt(event.target.value)
    let cardMove= currentPlayer.hand.splice(index, 1)[0]

    if(index === currentPlayer.hand.length) {
      currentPlayer.hand.unshift(cardMove)
    } else {
      currentPlayer.hand.splice(index + 1, 0, cardMove)
    }
    //ONLY UPDATE LOCALLY!!!
    if (playerState === 1) {
      setPlayerOne({...playerOne, hand: currentPlayer.hand})
    }
    else {
      setPlayerTwo({...playerTwo, hand: currentPlayer.hand})
    }
  }

  //DECLARE KNOCK OR GIN
  function declareKnock() {
    if (playerState === 1 ) {
      updateState({...gameState,
        p1DeclaredKnock: true
      })  
    }
    else {
      updateState({...gameState,
        p2DeclaredKnock: true
      })  
    }
  }

  function declareGin() {
    if (playerState === 1 ) {
      updateState({...gameState,
        p1DeclaredGin: true
      })  
    }
    else {
      updateState({...gameState,
        p2DeclaredGin: true
      })  
    }
  }

  function declarationFailed() {
    if (playerState === 1 ) {
      updateState({...gameState,
        p1DeclaredKnock: false,
        p1DeclaredGin: false
      }) 

      currentPlayer.sets.forEach(set => {
        set.forEach(card => {
          currentPlayer.hand.push(card)
        })
      }) 
      setPlayerOne({...playerOne, hand: currentPlayer.hand, sets:[[],[],[],[]],})
    }
    else {
      updateState({...gameState,
        p2DeclaredKnock: false,
        p2DeclaredGin: false
      })  

      currentPlayer.sets.forEach(set => {
        set.forEach(card => {
          currentPlayer.hand.push(card)
        })
      }) 
      setPlayerTwo({...playerTwo, hand: currentPlayer.hand, sets:[[],[],[],[]],})
    }
  }

  function declarationSucceeded(dataScore) {
    if (playerState === 1 ) {
      if (currentPlayer.declaredGin) {
        updateState({...gameState,
          p1DeclaredKnock: false,
          p1DeclaredGin: false,
          p1HasGin: true,
          p1Score: dataScore,
          p1Turn: false
        }) 
        updatePlayerOne({...playerOne, hand: currentPlayer.hand, sets: currentPlayer.sets})
      } else {
        updateState({...gameState,
          p1DeclaredKnock: false,
          p1DeclaredGin: false,
          p1HasKnock: true,
          p1Score: dataScore,
          p1Turn: false
        }) 
        updatePlayerOne({...playerOne, hand: currentPlayer.hand, sets: currentPlayer.sets})
      }
    } else {
      if (currentPlayer.declaredGin) {
        updateState({...gameState,
          p2DeclaredKnock: false,
          p2DeclaredGin: false,
          p2HasGin: true,
          p2Score: dataScore,
          p2Turn: false
        }) 
        updatePlayerTwo({...playerTwo, hand: currentPlayer.hand, sets: currentPlayer.sets})
      } else {
        updateState({...gameState,
          p2DeclaredKnock: false,
          p2DeclaredGin: false,
          p2HasKnock: true,
          p2Score: dataScore,
          p2Turn: false
        }) 
        updatePlayerTwo({...playerTwo, hand: currentPlayer.hand, sets: currentPlayer.sets})
      }
    }
  }

  //SETS
  function moveToSet (event) {
    let index = parseInt(event.target.value)
    let setIndex = parseInt(event.target.name)
    let cardMove= currentPlayer.hand.splice(index, 1)[0]
    currentPlayer.sets[setIndex].push(cardMove)

    if (playerState === 1) {
      setPlayerOne({...playerOne, hand: currentPlayer.hand, sets: currentPlayer.sets})
    }
    else {
      setPlayerTwo({...playerTwo, hand: currentPlayer.hand, sets: currentPlayer.sets})
    }
  }

  // SET SORT
  function setMoveLeft (event) {
    let index = parseInt(event.target.value)
    let setIndex = parseInt(event.target.name)
    let cardMove = currentPlayer.sets[setIndex].splice(index, 1)[0]
    

    if(index === 0) {
      currentPlayer.sets[setIndex].push(cardMove)
    } else {
      currentPlayer.sets[setIndex].splice(index - 1, 0, cardMove)
    }
    
    //ONLY UPDATE LOCALLY!!!
    if (playerState === 1) {
      setPlayerOne({...playerOne, sets: currentPlayer.sets})
    }
    else {
      setPlayerTwo({...playerTwo, sets: currentPlayer.sets})
    }
  }

  function setMoveRight (event) {
    let index = parseInt(event.target.value)
    let setIndex = parseInt(event.target.name)
    let cardMove = currentPlayer.sets[setIndex].splice(index, 1)[0]
    console.log(currentPlayer.sets[setIndex].length)
    console.log(index)

    if(index === currentPlayer.sets[setIndex].length) {
      currentPlayer.sets[setIndex].unshift(cardMove)
      console.log(currentPlayer.sets[setIndex])
    } else {
      currentPlayer.sets[setIndex].splice(index + 1, 0, cardMove)
    }
    //ONLY UPDATE LOCALLY!!!
    if (playerState === 1) {
      setPlayerOne({...playerOne, sets: currentPlayer.sets})
    }
    else {
      setPlayerTwo({...playerOne, sets: currentPlayer.sets})
    }
  }

  function backToHand (event) {
    let index = parseInt(event.target.value)
    let setIndex = parseInt(event.target.name)
    let cardMove = currentPlayer.sets[setIndex].splice(index, 1)[0]
    currentPlayer.hand.push(cardMove)

    if (playerState === 1) {
      setPlayerOne({...playerOne, hand: currentPlayer.hand, sets: currentPlayer.sets})
    }
    else {
      setPlayerTwo({...playerTwo, hand: currentPlayer.hand, sets: currentPlayer.sets})
    }
  }

  //SET CHECK FUNCTIONS
  function checkSet(set) {
    if (set.length === 0) {
      console.log(`set was empty`)
      return true
    }
    let numberToMatch = set[0].number
    for (var i = 1; i < set.length; i++) {
      if(set[i].number !== numberToMatch) {
        console.log(`numbers didn't matchin a set` )
        return false
      }
      else {
        return true
      }
    }
  }

  function checkRun(set) {
    if (set.length === 0) {
      console.log(`set was empty`)
      return true
    }
    let suitToMatch = set[0].suit
    for (var i = 1; i < set.length; i++) {
      if(set[i].suit !== suitToMatch) {
        console.log(`suit didn't match for run check`)
        return false}
    }
    for (var i = 0; i < set.length - 1 ; i++) {
      if(set[i].number + 1 !== set[i + 1].number) {
        console.log(`numbers were not consecutive`)
        return false
      }
      else {return true}
    }
  }

  // SUMBIT SETS

  function declaredSubmitSets () {
    if (currentPlayer.hand.length) {
      console.log("not all card used")
      declarationFailed()
      return
    }

    //if GinDeclaration and unmatched array has cards - declarationFailed()
    if (currentPlayer.declaredGin === true && currentPlayer.sets[3].length > 0) {
      console.log("unmatched values can't make Gin")
      declarationFailed()
      return
    }

    //if knockDeclaration and unmatched card values are greater than 10 - declarationFailed() 
    let unmatchedValue = 0
    currentPlayer.sets[3].forEach(card => {
      if(card.number > 10) {
        card.number = 10
      }
      unmatchedValue += card.number
    })

    if (currentPlayer.declaredKnock === true && unmatchedValue > 10) {
      console.log("unmatched too high for Knock")
      declarationFailed()
      return
    }

    //if sets 0 - 2 have 0 < length > 3, declarationFailed() 
    for (let i = 0; i < 3; i++) {
      if (currentPlayer.sets[i].length == 1 || currentPlayer.sets[i].length == 2 ) {
        console.log(`set ${i+1} length invalid`)
        declarationFailed()
        return
      }
    }

    //if sets are sets, if not declaration Fails
    for (let i = 0; i < 3; i++) {
      if (checkSet(currentPlayer.sets[i]) || checkRun(currentPlayer.sets[i])) {
        console.log(`set ${i+1} is valid`)
      }
      else {
        console.log("one or more sets arent sets")
        declarationFailed()
        return
      }
    }

    //All Checks Passed
    declarationSucceeded(unmatchedValue)
  }

  function rebutleSubmitSets () {
    if (currentPlayer.hand.length) {
      console.log("not all card used")
      declarationFailed()
      return
    }

    //if sets 0 - 2 have 0 < length > 3, declarationFailed() 
    for (let i = 0; i < 3; i++) {
      if (currentPlayer.sets[i].length == 1 || currentPlayer.sets[i].length == 2 ) {
        console.log(`set ${i+1} length invalid`)
        declarationFailed()
        return
      }
    }

    //if sets are sets, if not declaration Fails
    for (let i = 0; i < 3; i++) {
      if (checkSet(currentPlayer.sets[i]) || checkRun(currentPlayer.sets[i])) {
        console.log(`set ${i+1} is valid`)
      }
      else {
        console.log("one or more sets arent sets")
        declarationFailed()
        return
      }
    }

    //All Checks Passed
    let unmatchedValue = 0
    currentPlayer.sets[3].forEach(card => {
      if(card.number > 10) {
        card.number = 10
      }
      unmatchedValue += card.number
    })
    endGame(unmatchedValue)
  }

  function endGame(dataScore) {
    if (playerState === 1 ) {
      if (gameState.p2Score === 0) {
        updateState({...gameState,
          finalResult: `Player Two Scored ${dataScore + 25}`,
          ended: true
        }) 
      } else if (gameState.p2Score !== 0) {
        if (dataScore - gameState.p2score < 0){
          updateState({...gameState,
            finalResult: `PlayerOne Scored ${gameState.p2score - dataScore}`,
            ended: true
          }) 
        } else if (dataScore - gameState.p2score === 0) {
          updateState({...gameState,
            finalResult: `No Points Scored`,
            ended: true
          }) 
        } else {
          updateState({...gameState,
            finalResult: `PlayerTwo Scored ${dataScore - gameState.p2score}`,
            ended: true
          }) 
        }
      }
    } else {
      if (gameState.p1Score === 0) {
        updateState({...gameState,
          finalResult: `Player One Scored ${dataScore + 25}`,
          ended: true
        }) 
      } else if (gameState.p1Score !== 0) {
        if (dataScore - gameState.p1score < 0){
          updateState({...gameState,
            finalResult: `Player Two Scored ${gameState.p1score - dataScore}`,
            ended: true
          }) 
        } else if (dataScore - gameState.p1score === 0) {
          updateState({...gameState,
            finalResult: `No Points Scored`,
            ended: true
          }) 
        } else {
          updateState({...gameState,
            finalResult: `Player One Scored ${dataScore - gameState.p1score}`,
            ended: true
          }) 
        }
      }
    }

  }
  //DISPLAY
  return (
    <div className="container">
      {gameState.ended ? (
        <div>
          <h2>Game Over</h2>
          <p>{gameState.finalResult}</p>
        </div>
      ) : (
        <div>
          <h2>Current Player: {playerState}</h2>

          {playerState === 1 && currentPlayer.hand.length < 10 ? (
            <button onClick={dealCards}>Deal Cards</button>
          ): (<></>)}
          
          <button onClick={switchPlayer}>Switch Player</button>

          {/* HAND */}
          <h1>Hand</h1>
          <div className="hand">
            {currentPlayer.hand.map((card, index) => (
              <div className="playing-card">
                <p>{card.display}</p>
                <p> {card.suit}</p>
                <div className="sort-buttons">
                  <button value={index} onClick={moveLeft} className="move-left">
                    {"\u21E6"}
                  </button>
                  <button value={index} onClick={moveRight} className="move-right">
                    {"\u21E8"}
                  </button>
                </div>
                {/* RENDERD DISCARD BUTTON */}
                {currentPlayer.mustDiscard === true ? (
                <button value={index} onClick={(e) => discardCard(e)} className="discard-btn">Discard</button>
                ) : (
                <></>
                )}
                {/* RENDERS SET PLACEMENT BUTTONS */}
                {currentPlayer.declaredKnock === true || currentPlayer.declaredGin || currentPlayer.knockedAgainst || currentPlayer.ginAgainst ? (
                <div className="set-btns">
                  <button name={0} value={index} onClick={moveToSet}>Set 1</button>
                  <button name={1} value={index} onClick={moveToSet}>Set 2</button>
                  <button name={2} value={index} onClick={moveToSet}>Set 3</button>
                  <button name={3} value={index} onClick={moveToSet}>Unmatched</button>
                </div>
                ) : (
                <></>
                )}
              </div>
            ))}
          </div>
          
          {/* RENDERS SET DISPLAYS */}
          {currentPlayer.declaredKnock || currentPlayer.declaredGin || currentPlayer.knockedAgainst || currentPlayer.ginAgainst ? (
              <div className="sets">
                {currentPlayer.sets.map((set, setIndex) => (
                  <div>
                    {setIndex === 3 ? (
                      <h3>Unmatched</h3>
                    ) : (
                      <h3>Set {setIndex + 1}</h3>
                    )}
                    <div className="set">
                      {set.map((card, cardIndex) => (
                        <div className="playing-card">
                          <p>{card.display}</p>
                          <p> {card.suit}</p>

                          <div className="sort-buttons">
                            <button name={setIndex} value={cardIndex} onClick={setMoveLeft} className="move-left">
                              {"\u21E6"}
                            </button>
                            <button name={setIndex} value={cardIndex} onClick={backToHand} className="back-to-hand">
                              back
                            </button>
                            <button name={setIndex} value={cardIndex} onClick={setMoveRight} className="move-right">
                              {"\u21E8"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))} 
                <button onClick={currentPlayer.declaredGin || currentPlayer.declaredKnock ? (declaredSubmitSets) : (rebutleSubmitSets)}>submit Sets</button>
              </div>
            ) : (
              <></>
            )  
          }  

          <br></br>
          <h3>TOP DISCARD CARD:</h3> 
          {gameState.discard.length > 0 ? (
            <div className="playing-card">
              <p>{gameState.discard[0].display}</p> 
              <p>{gameState.discard[0].suit}</p>
            </div>
          ) : ( 
            <p>No Cards in Discard</p>
          )}
          <br></br>

          {currentPlayer.mustDiscard || !currentPlayer.turn  || currentPlayer.declaredGin  || currentPlayer.declaredKnock ? (
          <h3>Cannot Act</h3>
          ) : (
          <div>
            <button onClick={deckDraw}>Draw from Deck</button>
            {gameState.discard.length > 0 ? (
              <button onClick={drawDiscard}>Draw from Discard</button>
              ) : (
              <p>Can't draw from Discard</p>
            )}
            <button onClick={declareKnock}>Knock</button>
            <button onClick={declareGin}>Declare Gin</button>
          </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;