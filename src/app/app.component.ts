import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cards-ui';

  cards: Card[] = [];

  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  }

  constructor(private cardsService : CardsService) {

  }

  ngOnInit(): void {
    this.getAllCards();
  }

  //method to get the service
  getAllCards() {
    this.cardsService.getAllCards().subscribe(
      response => {
        this.cards = response;
      }
    );
  }

  //add cards
  onSubmit() {
    if(this.card.id === '') {
      this.cardsService.addCard(this.card).subscribe(
        response => {
          this.getAllCards();
          this.card = {
            id: '',
            cardHolderName: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: ''
          };
        }
      );
    }
    else {
      this.updateCard(this.card);
    }

  }

  //delete card
  deleteCard(id : string) {
    this.cardsService.deleteCard(id).subscribe(
      response => {
        this.getAllCards();
      }
    );
  }

  //populating form for editing
  populateForm(card: Card) {
    this.card = card;
  }

  //updating card
  updateCard(card: Card) {
    this.cardsService.updateCard(card).subscribe(
      response => {
        this.getAllCards();
      }
    )
  };
}
