const electron = require('electron');
const path = require('path');
const url = require('url');

// import { User } from "./models/user";
// import User from '../../models/user';


// const users = await User.findAll();
// console.log(users);
// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;
let LoggedInUser = null;
// const adduser,edituser,deleteuser,viewuser;
// const addcategories , editcategories , confirmdeletecategories, viewcategories;
// const addproducts , editproducts , confirmdeleteproducts, viewproducts;
// const addorders , editorders , confirmdeleteorders, vieworders;
// const addmessages , editmessages , confirmdeletemessages, viewmessages;
// const addsales , editsales , confirmdeletesales, viewsales;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window

  mainWindow = new BrowserWindow({
    
    width: 1100,
    height:600,
    title:'Inventory Application',
    webPreferences: {
      nodeIntegration: true
    }
  });
   require('./index');

  // if (! require('./index')){

  // }
  
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file:',
    slashes:true
  }));
  
  console.log(LoggedInUser);
  
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});



// Handle add item window
function createAddWindow(title){
  addWindow = new BrowserWindow({
    width: 600,
    height:400,
    title
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, `views/${title}.html`),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}

function register() {
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/register.html'),
    protocol: 'file:',
    slashes:true
  }));
}


// Handle add item window
function popup(view,method){
  addWindow = new BrowserWindow({
    width: 600,
    height:550,
    title: view + '-' + method
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, `views/popups/${view}/${method}.html`),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}


ipcMain.on('register:user', (event, newUser) => {
    //console.log(newUser) // prints "ping"

    if(!newUser){
      mainWindow.webContents = mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file:',
        slashes:true
      }));
      
    }else {
      mainWindow.webContents = mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file:',
        slashes:true
      }));
      
      
    }
    
    event.returnValue = newUser;
    LoggedInUser = newUser;
  })


  ipcMain.on('user:login', (event, newUser) => {
    console.log(newUser) // prints "ping"

    if(!newUser){
      mainWindow.webContents = mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file:',
        slashes:true
      }));
      
    }else {
      mainWindow.webContents = mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/dashboard.html'),
        protocol: 'file:',
        slashes:true
      }));
      
    }
    
    event.returnValue = newUser;
  })

// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});



ipcMain.on('product:created', function(e, item){
  console.log("product created");
  
  mainWindow.webContents.send('product:created', item);
  //addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'InventoryApp',
    submenu:[
      {
        label:'Home',
        
        click(){
          mainWindow.webContents = mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file:',
            slashes:true
          }));
        }
      },
     
      // {
      //   label:'Help',
      //   click(){
      //     createAddWindow('settings')
      //   }
      // },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
 
// const views = ['product','category','order','sales','user','message'];

  // {
  //   label: 'New',
  //   submenu:[
  //     {
  //       label:'product',
        
  //       click(){
  //         popup('product','add');
  //       }
  //     }
  //     ,
      
  //     {
  //       label:'sale',
        
  //       click(){
  //         popup('sales','add');
  //       }
  //     },
  //     {
  //       label:'user',
        
  //       click(){
  //         register();
  //       }
  //     },
  //   ]
  // },


  // {
  //   label: 'Edit',
  //   submenu:[
  //     {
  //       label:'product',
        
  //       click(){
  //         popup('product','edit');
  //       }
  //     },
  //     {
  //       label:'category',
        
  //       click(){
  //         popup('category','edit');
  //       }
  //     },
  //     {
  //       label:'order',
        
  //       click(){
  //         popup('order','edit');
  //       }
  //     },
  //     {
  //       label:'sales',
        
  //       click(){
  //         popup('sales','edit');
  //       }
  //     },
  //     {
  //       label:'user',
        
  //       click(){
  //         popup('user','edit');
  //       }
  //     },
  //   ]
  // },


  // {
  //   label: 'Delete',
  //   submenu:[
  //     {
  //       label:'product',
        
  //       click(){
  //         popup('product','delete');
  //       }
  //     },
  //     {
  //       label:'category',
        
  //       click(){
  //         popup('category','delete');
  //       }
  //     },
  //     {
  //       label:'order',
        
  //       click(){
  //         popup('order','delete');
  //       }
  //     },
  //     {
  //       label:'sales',
        
  //       click(){
  //         popup('sales','delete');
  //       }
  //     },
  //     {
  //       label:'user',
        
  //       click(){
  //         popup('user','delete');
  //       }
  //     },
  //   ]
  // },

  // {
  //   label: 'View',
  //   submenu:[
  //     {
  //       label:'product',
        
  //       click(){
  //         popup('product','view');
  //       }
  //     },
  //     {
  //       label:'category',
        
  //       click(){
  //         popup('category','view');
  //       }
  //     },
  //     {
  //       label:'order',
        
  //       click(){
  //         popup('order','view');
  //       }
  //     },
  //     {
  //       label:'sales',
        
  //       click(){
  //         popup('sales','view');
  //       }
  //     },
  //     {
  //       label:'user',
        
  //       click(){
  //         popup('user','view');
  //       }
  //     },
  //   ]
  // },

  // {
  //   label: 'Help'
  // }
];



// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// const views = ['product','category','order','sales','user','message'];
// const methods = ['add','edit','delete','view'];

// const subviews = [];
// var met = '';
// views.forEach(vw => {
  
//   function subviewss(m){
//     return subviews;
//   }
//   subviews.push({
//     label:vw,
    
//     click(){
     
//       popup(vw,met);
//     }
//   });
// });
// methods.forEach(meth => {
  
//   mainMenuTemplate.push({
//     label: meth,
//     submenu: subviews
    
//   });
//   met = meth;
// });

// Add developer tools option if in dev
if(process.env.NODE_ENV == 'productio'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

