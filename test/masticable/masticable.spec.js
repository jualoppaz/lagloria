describe('Pruebas unitarias - Masticables', function() {
    it('El precio debe ser de 4 euros', function() {
        browser.get('http://localhost:8888/gamaPropia/toffeesYMasticables/masticables/53c555e7cdd2af1f0985fc0d');

        // El simbolo del euro tiene que ser copiado y pegado desde otro archivo, por ejemplo un .txt
        expect(element(by.binding('producto.price')).getText()).toEqual('4 € / Kg');
    });
});