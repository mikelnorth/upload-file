<template>
  <div class="upload-component">
    <h3>Upload An Image</h3>
      <div
        v-cloak
        ref="drag"
        class="upload-box inside-upload-box"
        :class="{ over: isOver }"
        @drop.prevent="handleFileDrop"
        @dragover.prevent
      >
      <button
          v-if="!isOver"
          ref="drag"
          class="inside-upload-box"
          type="file"
          color="primary"
          :outlined="true"
          height="40px"
          @dragover.prevent
          @click="handleBtnClick"
          >
          Upload Image
        </button>
         <input
          ref="uploader"
          class="inside-upload-box hidden"
          data-test="file-upload-input"
          type="file"
          accept=".png"
          :multiple="false"
          @change="onFileChanged"
          @click="resetFileEvent"
          @touchstart="resetFileEvent"
        />
        <span v-if="isOver" class="inside-upload-box" :class="{ over: isOver }">Drop Files Here</span>
        <span class="inside-upload-box upload-description">Select or Drang and Drop a .png under 5mb</span>
      </div>
      <ul class="document-upload-list">
        <li v-for="file in uploading" :key="file.name">
          <div>
            <div>
              <span class="file-name">Uploading... {{ file.name }}</span>
              <span class="size">({{ file.size | kb }} KB)</span>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  filters: {
    kb(val) {
      return Math.floor(val / 1024);
    },
  },
   data: () => ({
    isOver: false,
    uploading: [],
  }),
  mounted() {
    // Note this was just a fun little adition to add drag n drop and avoid glitchy behaviour from that
    // add the needed event listeners to the container
    this.$refs.drag?.addEventListener('dragover', () => {
      this.isOver = true; // add class on drag over
    });
    this.$refs.drag?.addEventListener('dragleave', e => {
      if (e.relatedTarget.className.includes('inside-upload-box')) {
        return; // This prevents a flicker caused when dragLeave event is fired by hovering over a child element
        // https://stackoverflow.com/questions/12945307/jquery-drag-and-drop-flickering-on-hover-webkit-only
      }
      this.isOver = false; // remove class on drag leave
    });
  },

  watch: {
    uploading: function (file) {
      file.length && this.handleUpload(file)
    }
  },

  methods: {
    handleBtnClick() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
        this.addFiles([...e.target.files]);
    },
    resetFileEvent(e) {
      // need to reset the input value so the onchange event always triggers
      e.target.value = '';
    },
    handleFileDrop(e) {
      this.isOver = false;
      const droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) {
        return;
      }
      if (droppedFiles.length > 1) {
        // Ideally I would use some sort of snack bar to indicate an error, for now a console log will work
        console.error('Please upload one file at a time.')
        return;
      }
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      this.addFiles([...droppedFiles]);
    },
    addFiles(files) {
      files.forEach(file => {
        if (this.validateFileSize(file) && this.validateFormat(file)) {
          this.uploading = [file];
        }
      });
    },
    async handleUpload(files) {
      const base64 = await this.toBase64(files[0])
      const { data } = await axios.post('http://localhost:8000/api/image', { base64 })
      this.uploading = []
      this.emitUpdateFiles(data.url)
    },
    toBase64(file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });
    },
    validateFormat(file) {
      const validFormats = ['.png','image/png'];
      const isValidFormat = validFormats.filter(format => file.type.includes(format)).length ? true : false;
      !isValidFormat && console.error('Invalid Format');
      return isValidFormat;
    },
    validateFileSize(file) {
      const isValidSize = Math.floor(file.size / 1024) <= 5000;
      !isValidSize && console.error('Please upload a file smaller than 5MB.');
      return isValidSize;
    },
    emitUpdateFiles(fileURL) {
      this.$emit('updateFiles', fileURL)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.upload-component {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 28px;
  }
}
.upload-box {
  position: relative;
  width: 350px;
  height: 100px;
  background: #24333f;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid #24333f;
  border-radius: 5px;
  button {
    padding: .75em 1em;
    border: none;
    border-radius: 3px;
    background: #ef796a;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  .upload-description {
    position: absolute;
    bottom: 0;
    padding: 5px;
  }
  &.over {
    border: 2px solid #4BB543;
  }
}
.document-upload-list {
  padding: 16px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  li {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
}
.size {
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
}
.file-name {
  font-weight: 500;
  margin-right: 5px;
}
.hidden {
  display: none;
}

@media(max-width: 1024px) {
  .upload-component {
    margin-top: 25px;
  }
  .upload-box {
    width: 250px;
  }
}
</style>
