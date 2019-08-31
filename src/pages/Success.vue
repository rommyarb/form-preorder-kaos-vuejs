<template>
	<div is="sui-container" class="app-container">
		<sui-segment>
			<sui-form>
				<h2 is="sui-header" style="color:green">SUCCESS!</h2>

				<p>Silahkan transfer sebesar <b>{{formatRupiah(125000*$route.params.jumlah_item)}}</b><br>ke rekening Bank
					Muamalat
					<b>3280010785</b>
					a.n. <b>M. Nanda Haryka Pratama</b></p>
				<p>
					Kemudian konfirmasi pembayaran:
				</p>
				<div style="text-align:center">
					<sui-button positive content="Konfirmasi Pembayaran" icon="whatsapp" @click="konfirmasiPembayaran" />
				</div>
			</sui-form>
		</sui-segment>
	</div>
</template>

<script>
	export default {
		beforeMount() {
			if (!this.$route.params.jumlah_item) {
				this.$router.replace('/')
			}
		},
		methods: {
			formatRupiah(angka) {
				var rupiah = '';
				var angkarev = angka.toString().split('').reverse().join('');
				for (var i = 0; i < angkarev.length; i++)
					if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
				return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
			},
			konfirmasiPembayaran(e) {
				window.location.href =
					"https://wa.me/628567310119?text=Nama%20Pemesan%3A%0A%0ADari%20Bank%3A%0A%0ANama%20Pengirim%20(a.n.%20rekening)%3A%0A%0ANominal%3A%20Rp%20"
				e.preventDefault()
			},
		}
	}
</script>