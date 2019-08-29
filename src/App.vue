<template lang="html">
<div is="sui-container" class="app-container">
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <label>Nama</label>
        <input placeholder="Nama Anda">
      </sui-form-field>

      <sui-form-field>
        <label>Jumlah</label>
        <sui-button-group icons>
          <sui-button icon="minus" />
          <sui-button disabled style="background-color:lightgrey;color:black;">{{jumlah}}</sui-button>
          <sui-button icon="plus" />
        </sui-button-group>
      </sui-form-field>

      <sui-accordion is="sui-menu" :active-index="1" vertical exclusive styled>
        <sui-accordion-title is="sui-menu-header" active>
          <sui-icon name="dropdown" />
          Ukuran Kaos
        </sui-accordion-title>
        <sui-accordion-content>
          <sui-form>
            <sui-form-field>
              <sui-checkbox label="M" />
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox label="L" />
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox label="XL" />
            </sui-form-field>
          </sui-form>
        </sui-accordion-content>
      </sui-accordion>

      <sui-form-field>
        <sui-checkbox label="I agree to the Terms and Conditions" />
      </sui-form-field>
      <sui-button type="submit">Submit</sui-button>
    </sui-form>
  </sui-segment>
</div>
</template>

<script>
export default {
  name: "FormExample",
  data() {
    return {
      jumlah: 1
    }
  },
  mounted(){
    alert('hohohow')
  }
};
</script>

<style scoped>
.app-container {
  width: 400px !important;
  padding-top: 30px;
}
</style>
