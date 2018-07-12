import { Promise } from "es6-promise";

class TestModel {

    public data;
    
    constructor(){
        this.data = [
            {id: 1, name: "Bruce Wayne"},
            {id: 2, name: "Clark Kent"},
            {id: 3, name: "Harvey Dent"}
        ];
    };
    
    public getAll(): any {
        return new Promise((resolve, reject) => {
            resolve({ 
                success: true,
                message: "Received data!!!",
                data: this.data ? this.data : []
            });
        });
    }

    public getFiltered(id): any {
        return new Promise((resolve, reject) => {
            resolve({ 
                success: true,
                message: "Received data!!!",
                data: this.data ? this.data.find((item) => item.id == id) : null
            });
        });
    }
}

export default new TestModel();