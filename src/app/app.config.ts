export interface Config {
  fileUrl: string;
  bannerUrl: string;
  actorImageUrls: Array<string>;
  actors: Array<Object>;
};

export const APP_CONFIG: Config = {
  fileUrl: 'data/characters.json',
  bannerUrl: 'https://gothamlane.com/images/main_400w.jpg',
  actors: [{
                  "name" : "Luke Skywalker",
                  "url" : "https://swapi.co/api/people/1/"
                }, {
                  "name" : "Darth Vader",
                  "url" : "https://swapi.co/api/people/4/"
                }, {
                  "name" : "Obi-wan Kenobi",
                  "url" : "https://swapi.co/api/people/unknown/"
                }, {
                  "name" : "R2-D2",
                  "url" : "https://swapi.co/api/people/2/"
                }],
  actorImageUrls: [
                    'https://gothamlane.com/images/luke.jpg', 
                    'https://gothamlane.com/images/darth.jpg', 
                    'https://gothamlane.com/images/obi.jpg', 
                    'https://gothamlane.com/images/R2.jpg'
                  ]
};