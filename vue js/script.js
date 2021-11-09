new Vue({
    el:"#root",
    data:{
        author_id:null,
        title:null,
        description:null,
        bookList:[],
        book_id:null,
        URL:"http://localhost:3000/api/books",
    },
    methods: {
        getBooks(){
            axios.get(this.URL).then(response=>{
                console.log(response.data.data);
                this.bookList = response.data.data;
            })
        },
        createBook(){
            let bookData = {};
            bookData.author_id =parseInt(this.author_id);
            bookData.title = this.title;
            bookData.description = this.description;
            axios.post(this.URL, bookData).then(response=>{
                console.log(response.data);
                this.getBooks();
            })
        },
        deleteBook(bookID){
            axios.delete(this.URL+"/"+bookID).then( response=>{
                console.log(response.data);
                this.getBooks();
            })
        },
        getInfoEdit(bookID){
            axios.get(this.URL+"/"+bookID).then( response=>{
                console.log(response.data);
                this.author_id = response.data.author_id;
                this.title = response.data.title;
                this.description = response.data.description;
                this.book_id = response.data.id;
            })
        },
        updateBookInfo(){
            let bookData = {};
            bookData.author_id =parseInt(this.author_id);
            bookData.title = this.title;
            bookData.description = this.description;
            axios.put(this.URL+"/"+this.book_id, bookData).then(response=>{
                console.log(response.data);
                this.getBooks();
                this.author_id = this.title = this.description = null;
            })
        }
    },
    mounted() {
        this.getBooks();
    },
})