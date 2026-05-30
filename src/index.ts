// class User{
//     email:string
//     name: string
//     constructor(email: string, name: string){
//         this.email = email;
//         this.name = name;
        
//     }
// }

class User{
    private _courseCount = 1;
    constructor( 
        public email: string, 
        public name: string
    ){
    }
    get getAppleEmail(): string{
        return `apple${this.email}`;
    }
    get courseCount(): number{
        return this._courseCount;
    }
    set courseCount(courseNum){
        if(courseNum <= 1){
            throw new Error("Course count should be more than 1");
        }
        this._courseCount = courseNum;
    }
}
const aeto = new User("aeto@.com", "aeto");
// same code will still be produced as the previous one, but it is more concise and easier to read
// in setters, there should be no return type, and in getters, there should be no parameters
// to use an interface in a class, we can use the implements keyword
// to use a property in one interface in another interface, we can use the extends keyword, and if it is more than one interface, we can use the , to separate them, but for a type, we use the & to separate them, for classes, we use & to separate them

