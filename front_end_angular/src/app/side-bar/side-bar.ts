export class Sidebar {
    title:string = 'testTitle';
    alink: alink[] = [
      {
        name:'test',
        link:'/home'
      },
      {
        name:'test2',
        link:'/read'
      }
    ];
}



export class alink {
    name:string = '';
    link:string=  '';
}
