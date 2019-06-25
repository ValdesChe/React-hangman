import React, {Component} from 'react';
import './App.css';

const LETTERS =  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const DELIMITER = "_"
class App extends Component {
  constructor() {
    super();
    this.state = {
      guessWord : this.randomizeWord(),
      usedLetters : [] ,
      // alphabetLetters : this.generateAlphabetLetters(),
    }  
    this.handleCardClick = this.handleCardClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.isLetterUsed = this.isLetterUsed.bind(this);
  }

  /**
   *  Give a random word / sentence
   */
  randomizeWord() {
        
    const sentences= [
      'Cameroun',
      'so fat I swerved to miss her and ran out of gas',
      'Juridiction',
      'Cameroon',
      'so fat she don need no internet shes already world wide',
      'so hair her armpits look like Don King in a headlock',
      'victoire',
      'so fat she can hear bacon cooking in Canada',
      'so because she all those other bitches',
      'so stupid she believes everything that Brian Williams says',
      'so ugly she scared off Flavor Flav',
      'Mes reves les plus fou ! Booom',
      'is twice the man you are',
      'is like Bazooka Joe cents a blow',
      'is like an ATM open',
      'is like a championship ring everybody puts a finger in her'
    ];
    const index = Math.floor(Math.random() * (sentences.length));
    return sentences[index];
  }

  /**
   * Generate alphabet
   */
  generateAlphabetLetters() {
    let alphabetLetters = [], i = 0;
    for (i =0 ; i <= LETTERS.length ; ++i) {
      alphabetLetters.push(
        {
          value: LETTERS[i],
          tries : 0
        }
      );
    }
    return alphabetLetters;
  }

  /**
   * 
   */
  render() {
    const remainingWord = this.computeDisplay(this.state.guessWord, this.state.usedLetters);
    
    const gameNotFinished = remainingWord.includes(DELIMITER)

    const remainingGuesses = gameNotFinished && 
    (<div className="remaining" >
      <span className="guesses">{this.state.usedLetters.length} </span>
    </div>) 

    return ( 
      <div className = "pendu" >
        { remainingGuesses }
        <div className="guessWord">
          <ul className="letters">
            {
              remainingWord.map((letter, index) => {
                return (
                  <li className={"word-letter" } key={index} >{letter}</li>
                )
              })
            }
          </ul>
        </div>
        <div className="grid">
        
        {
          gameNotFinished ? (
            <ul className="letters">
              {
                  LETTERS.map((letter, index) => {
                    return (
                      <li className={"default button " + (this.isLetterUsed(letter) && " used") } key={index}  onClick={() => this.handleCardClick(letter)}>{letter}</li>
                    )
                  })
              }
            </ul>
          ) : (
            <div>
            <h1>Bravo vous avez gagné la partie en { this.state.usedLetters.length} coups </h1>
            <a href="#none" className="restart" onClick={(event) => this.restartGame(event)}>REPRENDRE LA PARTIE</a>
            </div>
          )
        }
        </div>
      </div > 
    );
  }

  isLetterUsed(letter) {
    const {usedLetters} = this.state
    return usedLetters.includes(letter)
  }

  restartGame(event) {
    event.preventDefault()
    this.setState({
      guessWord: this.randomizeWord(),
      usedLetters: []
    })
  }

  handleCardClick(letter){
    this.setState({usedLetters: this.state.usedLetters+ [...letter]})
  }
  


  /**
   * Handle click on letterS button
   */

  computeDisplay(phrase, usedLetters) {
    const mask =  phrase.toLowerCase().trim().replace(/\w/g,
      (letter, index) =>  {
        let elt = (usedLetters.includes(letter) ? letter : DELIMITER) ;
        
        elt += ( (index < phrase.length -1) ? ',':'' )
        
        return elt;
      }
    )
    // console.log(mask); 
    
    return mask.split(',');
  }
}


export default App;