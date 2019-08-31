<template>
  <div is="sui-container" style="padding-top:30px;padding-bottom:30px;">
    <sui-segment>
      <h2 is="sui-header" textAlign="center">Data Pre-order Kaos</h2>
      <sui-table celled>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell :width="1">No.</sui-table-header-cell>
            <sui-table-header-cell :width="3">Nama Pemesan</sui-table-header-cell>
            <sui-table-header-cell :width="4">Kaos</sui-table-header-cell>
            <sui-table-header-cell>Pengiriman</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-body>
          <sui-table-row v-for="(item, index) in data" v-bind:key="index">
            <sui-table-cell>{{index+1}}</sui-table-cell>
            <sui-table-cell>{{item.nama}}</sui-table-cell>
            <sui-table-cell>{{getKaos(item.kaos_)}}</sui-table-cell>
            <sui-table-cell v-html="getPengiriman(item.nama_penerima,item.nohp_penerima,item.alamat)"></sui-table-cell>
          </sui-table-row>
        </sui-table-body>

        <!-- <sui-table-footer>
          <sui-table-row>
            <sui-table-header-cell colspan="3">
              <sui-menu v-sui-floated:right pagination>
                <a is="sui-menu-item" icon>
                  <sui-icon name="left chevron" />
                </a>
                <a is="sui-menu-item">1</a>
                <a is="sui-menu-item">2</a>
                <a is="sui-menu-item">3</a>
                <a is="sui-menu-item">4</a>
                <a is="sui-menu-item" icon>
                  <sui-icon name="right chevron" />
                </a>
              </sui-menu>
            </sui-table-header-cell>
          </sui-table-row>
        </sui-table-footer> -->
      </sui-table>

      <div v-show="loading" style="text-align:center">
        <img src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" style="height:80px" />
      </div>
    </sui-segment>
  </div>
</template>

<script>
  import {
    db
  } from '../db'
  export default {
    data() {
      return {
        data: [],
        loading: true
      }
    },
    methods: {
      getData() {
        db.collection('pre_order_kaos').get().then(snap => {
          snap.forEach(item => {
            if (item.data().nama !== "" && item.data().nama_penerima !== "" && item.data().nohp_penerima !==
              "") {
              this.data.push(item.data())
            }
          })
          this.loading = false
        }).catch(e => {
          console.error('getData()', e)
        })
      },
      getKaos(kaos) {
        const jumlah = kaos.length
        let r = jumlah + " item" + (jumlah > 1 ? "s" : "") + " ("
        let ukuran_ = []
        kaos.forEach(item => {
          ukuran_.push(item.ukuran ? item.ukuran : "?")
        })
        r = r + ukuran_.join(', ')
        return r + ")"
      },
      getPengiriman(nama_penerima, nohp_penerima, alamat) {
        return nama_penerima + "<br><b>" + nohp_penerima + "</b><br>" + alamat.detail + ", " + alamat.kecamatan +
          ",<br>" + alamat
          .kota + ", " + alamat.provinsi + " " + alamat.kode_pos
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>