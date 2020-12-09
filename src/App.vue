<template>
  <div id="app">
    <section class='intro'>
      <div class='split'>
        <div class='intro-text'>
          <h1>Here is what I built!</h1>
          <p>Feel free to take a look at alfkjdlfj.github.com to peek under the hood. I built this out in VueJS with a NodeJS backend</p>
          <p>Please a select a file or drag n' drop to interact with the backend API. The API will then upload your document to a remote server for safe keeping!</p>
          <p>After uploading you will then be able to view the documents you have uploaded!</p>
          <p>This is just a simple little app with api integrations, enjoy!</p>
        </div>
        <UploadImage @updateFiles="handleUpdate"/>
      </div>
      <h2 class='hint-text'>View Images Bellow</h2>
    </section>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ef796a" fill-opacity="1" d="M0,160L80,186.7C160,213,320,267,480,245.3C640,224,800,128,960,106.7C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
    <section>
      <h2>Uploaded Files</h2>
      <Image-component :files="files"/>
    </section>
    <footer>
      <p>Some fun additions to build out was the drag and drop, local storage and overall css of the page.</p>
    </footer>
  </div>
</template>

<script>
import UploadImage from './components/UploadImage.vue'
import ImageComponent from './components/Image.vue'

export default {
  name: 'App',
  components: {
    UploadImage,
    ImageComponent,
  },
  data() {
    return {
      files: []
    }
  },
  mounted() {
    // check if we have local files to display
    const localFiles = this.getFilesLocalStorage();
    if (localFiles) {
      this.files = localFiles;
    }
  },
  methods: {
    handleUpdate(file) {
      this.files.unshift(file);
      this.setFilesLocalStorage()
    },
    setFilesLocalStorage() {
      localStorage.setItem("files", JSON.stringify(this.files))
    },
    getFilesLocalStorage() {
      return JSON.parse(localStorage.getItem("files"));
    }
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Poppins',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.intro{
  display: flex;
  flex-direction: column;
  padding:  4em 2em;
  padding-bottom: 0;
  background: #ef796a;
  color: white;
  .split {
    display: flex;
    justify-content: space-evenly;
  }
  .hint-text {
    position: absolute;
    width: 100%;
    bottom: 335px;
  }
}
.intro-text {
  h1 {
    font-size: 2.5rem;
  }
  padding: 30px;
  border: 1px solid #fff;
  border-radius: 5px;
  width: 600px;
  font-size: 20px;
}

footer {
  margin-top: 50px
}

@media(max-width: 1440px) {
  .intro-text {
    width: 400px;
  }
  .hint-text {
    display: none;
  }
}

@media(max-width: 1024px) {
  .intro .split {
    align-items: center;
    flex-direction: column;
  }
  .intro-text {
    width: unset;
  }
}
</style>
