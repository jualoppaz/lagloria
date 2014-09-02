describe('Pruebas unitarias - Index', function() {
    it('Debe tener el titulo establecido', function() {
        browser.get('http://localhost:8888');

        expect(browser.getTitle()).toEqual('Caramelos La Gloria');
    });

    it('No debe calcular la fecha de ultima actualizacion', function() {
        browser.get('http://localhost:8888');

        expect(element(by.binding("fecha")).getText())
            .toEqual('Última actualización: Estamos en local');
    });

});





