// Create array of characters
const characters= ['Captain-America','ironman','Thanos','Hulk'];
let chr_attackpwr = [25,15,30,10];
let sel_character = undefined;
let sel_chr_ap = undefined;
let sel_enemychr = undefined;
let sel_chr_hp = undefined;
let set_emy_hp = undefined;
let sel_emy_ap = undefined;
let chr_healthpt = [200,150,250,180];
let chr_basept = 10;
let isFinished =false;
let defeated_enemylist = [];


// 7. Create an "on-click" event attached to the document.
document.addEventListener('click', e => {
    // since this listener will be live for every one of the items on the page that you click, check to see if what's clicked is one of the buttons by seeing if the item has one of the button classes
    console.log(defeated_enemylist.length);
    if (!e.target.className.split(' ').indexOf('image-button') &&
        (sel_character === undefined)) {
      // Inside the on-click event...
      console.log(e.target.name);
      document.querySelector('#button1').innerHTML = '';

      for(let i=0;i<characters.length;i++) {
          var x = document.createElement("INPUT");
          x.setAttribute("type", "image");
          console.log('${charachers[i].jpeg}')
          x.setAttribute("src",`./assets/images/${characters[i]}.jpeg`)
          x.setAttribute("value", `${chr_healthpt[i]}`);
          x.setAttribute("name",`${characters[i]}`);
          x.setAttribute("textContent",`${chr_healthpt[i]}`);
          // x.setAttribute("OnClick",`chr_selection(x.name)`);
          if(e.target.name === characters[i]) {
              sel_character = i;
              sel_chr_hp = chr_healthpt[i];
              sel_chr_ap = chr_attackpwr[i];
              x.className = 'image-button-done btn-img-tmp';
              document.querySelector('#button1').append(x);
          }
          else {
              x.className = 'enemy-button btn-img-tmp';
              document.querySelector('#enemy_list').append(x);
          }
      }
  
    }
    else if(!e.target.className.split(' ').indexOf('enemy-button') &&
            (sel_enemychr === undefined)) {
        console.log(e.target.name);
        document.querySelector('#enemy_list').innerHTML = '';
        document.querySelector('#button1').innerHTML = '';
        for(let i=0;i<characters.length;i++) {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "image");
            console.log('${charachers[i].jpeg}')
            x.setAttribute("src",`./assets/images/${characters[i]}.jpeg`)
            x.setAttribute("value", `${chr_healthpt[i]}`);
            x.setAttribute("name",`${characters[i]}`);
            x.setAttribute("textContent",`${chr_healthpt[i]}`);
            // x.setAttribute("OnClick",`chr_selection(x.name)`);
            if(e.target.name === characters[i]) {
                sel_enemychr = i;
                sel_emy_hp = chr_healthpt[i];
                sel_emy_ap = chr_attackpwr[i];
                x.className = 'enemy-button-done btn-img-tmp';
                document.querySelector('#selected_enemy').append(x);
                document.querySelector('#attackresult').innerHTML = '';
            }
            else if(i == sel_character){
                x.className = 'image-button-done btn-img-tmp';
                document.querySelector('#button1').append(x);
            }
            else if(defeated_enemylist.length > 0){
                let found = false;
                for(let j=0;j<defeated_enemylist.length;j++) {
                    console.log(defeated_enemylist[j]);
                    console.log(i);
                    if(i === defeated_enemylist[j]) {
                        // Already defeated
                        found = true;
                    }
                }
                if(found === false) {
                    x.className = 'enemy-button btn-img-tmp';
                    document.querySelector('#enemy_list').append(x);
                }
            }
            else {
                x.className = 'enemy-button btn-img-tmp';
                document.querySelector('#enemy_list').append(x);
            }
        }
    }
  })
  
// for attacking the enemies
function on_attack(){
    let chr_ap = undefined;
    if(sel_character === undefined) {
        // Need to select a charachter before playing
        document.querySelector('#attackresult').textContent = "Please select a character";
    }
    else if(sel_enemychr === undefined) {
        // Need to select a enemy before attacking
        document.querySelector('#attackresult').textContent = "Please select a enemy from list"
    }
    else {
        chr_ap = sel_chr_ap;
        sel_chr_hp -= sel_emy_ap;
        sel_emy_hp -= sel_chr_ap;
        sel_chr_ap += chr_basept;
        if(sel_chr_hp < 1) {
            // you lost the game restart the game
            document.querySelector('#attackresult').textContent = `You are  defeated. Better Luck next time`;
            isFinished = true;
        }
        else if(sel_emy_hp < 1) {
            // you have defeated the enemy
            document.querySelector('#selected_enemy').innerHTML = '';
            document.querySelector('#attackresult').textContent = `You have defeated ${characters[sel_enemychr]}`;
            defeated_enemylist.push(sel_enemychr);
            sel_enemychr = undefined;
            document.querySelector('#selected_enemy').innerHTML = '';
            if(defeated_enemylist.length == 3) {
                isFinished = true;
            }
        }
        else {
            document.querySelector('#attackresult').textContent = `You attacked ${characters[sel_enemychr]} for ${chr_ap} 
            ${characters[sel_enemychr]} attacked you for ${sel_emy_ap}`;
        }
    }
    console.log(`${sel_chr_hp}`);
    console.log(`${sel_emy_hp}`);
}

// to initialize the game
const init = _ => {
    document.querySelector('#enemy_list').innerHTML = '';
    document.querySelector('#button1').innerHTML = '';
    document.querySelector('#selected_enemy').innerHTML = '';
    document.querySelector('#attackresult').innerHTML = '';
for (let i = 0; i < characters.length; i++) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "image");
    x.className = 'image-button btn-img-tmp'
    console.log('${charachers[i].jpeg}')
    x.setAttribute("src",`./assets/images/${characters[i]}.jpeg`)
    x.setAttribute("value", `${chr_healthpt[i]}`);
    x.setAttribute("name",`${characters[i]}`);
    x.setAttribute("textContent",`${chr_healthpt[i]}`);
    // x.setAttribute("OnClick",`chr_selection(x.name)`);
    document.querySelector('#button1').append(x);
  }
  sel_character = undefined;
  sel_enemychr = undefined;
  sel_chr_ap = undefined;
  sel_chr_hp = undefined;
  sel_emy_ap = undefined;
  sel_emy_hp = undefined;
  isFinished = false;
  for(i=0;i<defeated_enemylist.length;i++) {
      defeated_enemylist.pop();
  }
  console.log(defeated_enemylist.length);
}
// to reset the page
function resetPage() {
    if(isFinished) {
        init();
    }
}
init()


// const rand = cap => Math.floor(Math.random() * cap) + 1
// let goalNum
// let currNum = 0
// let isFinished = false

// // initializes application
// const init = _ => {
//   isFinished = false
//   // sets random number for user to try matching
//   goalNum = rand(100)
//   // reset current user progress
//   currNum = 0
//   // displays goal number
//   document.querySelector('#goalNum').textContent = goalNum
//   // displays user's current progress
//   document.querySelector('#currNum').textContent = 0
//   // empties button div
//   document.querySelector('#buttons').innerHTML = ''

//   document.querySelector('#result').textContent = 'Click A Button to get closer to the number displayed.'

//   // generates three buttons with random values
//   for (let i = 0; i < 3; i++) {
//     let btn = document.createElement('button')
//     btn.className = 'someNum'
//     btn.textContent = '???'
//     btn.setAttribute('data-value', rand(20))
//     document.querySelector('#buttons').append(btn)
//   }
// }

// const reset = _ => {
//   if (isFinished) {
//     init()
//   }
// }

// const check = _ => {
//   if (currNum === goalNum) {
//     isFinished = true
//     document.querySelector('#result').textContent = 'Congratulations! You Matched The Number!'
//   } else if (currNum > goalNum) {
//     isFinished = true
//     document.querySelector('#result').textContent = 'Oh No! You seriously suck at this!'
//   } else {
//     document.querySelector('#result').textContent = 'Keep Going...'
//   }
// }

// document.addEventListener('click', e => {
//   if (e.target.className === 'someNum' && !isFinished) {
//     currNum += parseInt(e.target.dataset.value)
//     document.querySelector('#currNum').textContent = currNum
//     check()
//   }
// })

// // starts app initial state
// init()