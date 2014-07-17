//http://www.planetarybiology.com/exoexplorer_planets/

var m = $('#exoplanets tr:not(.header)').map(function (i, el) {
    var $el = $(el);
    return {
        rank: $el.find('td:first-child').text(),
        planet: {
            name: $el.find('td:nth-child(2) a').text(),
            link: $el.find('td:nth-child(2) a').attr('href'),
            jMass: $el.find('td:nth-child(3)').text(),
            semiAxis: $el.find('td:nth-child(4)').text(),
            orbitalEcc: $el.find('td:nth-child(5)').text(),
            orbitalPer: $el.find('td:nth-child(6)').text(),
            orbitalZone: $el.find('td:nth-child(7)').text()
        },
        star: {
            name: $el.find('td:nth-child(8) a').text(),
            link: $el.find('td:nth-child(8) a').attr('href'),
            dist: $el.find('td:nth-child(9)').text(),
            rAsc: $el.find('td:nth-child(10)').text(),
            decl: $el.find('td:nth-child(11)').text(),
            spectralType: $el.find('td:nth-child(12)').text(),
            metallicity: $el.find('td:nth-child(13)').text(),
            solMass: $el.find('td:nth-child(14)').text(),
            mag: $el.find('td:nth-child(15)').text(),
            luminosity: $el.find('td:nth-child(16)').text(),
            habZoneInner: $el.find('td:nth-child(17)').text(),
            habZoneOuter: $el.find('td:nth-child(18)').text()
        }
    };
});

// find constellation data

var cols = $('.wikitable thead th').map(function (i, el) { return $(el).find('a').attr('title'); }).toArray();

console.log(cols);

for (var i = 0; i < cols.length; i++) {
    if (cols[i].match(/name/i)) nameIndex = i + 1;
    if (cols[i].match(/bayer/i)) bayerIndex = i + 1;
    if (cols[i].match(/flam/i)) flamIndex = i + 1;
    if (cols[i].match(/variable/i)) varIndex = i + 1;
    if (cols[i].match(/draper/i)) draperIndex = i + 1;
    if (cols[i].match(/hipp/i)) hippIndex = i + 1;
    if (cols[i].match(/ascen/i)) ascIndex = i + 1;
    if (cols[i].match(/decl/i)) decIndex = i + 1;
    if (cols[i].match(/appar/i)) appIndex = i + 1;
    if (cols[i].match(/absol/i)) absIndex = i + 1;
    if (cols[i].match(/distance/i)) distIndex = i + 1;
    if (cols[i].match(/(classification|spectral)/i)) specIndex = i + 1;
}

var c = $('.wikitable tbody tr').map(function (i, el) {
  var $el = $(el);
  $el.find('sup').remove();
  var star = {};

  if (typeof nameIndex !== 'undefined') star.name = $el.find('td:nth-child(' + nameIndex + ') a').text();
  if (typeof bayerIndex !== 'undefined') star.bayer = $el.find('td:nth-child(' + bayerIndex + ')').text();
  if (typeof flamIndex !== 'undefined') star.flamsteed = $el.find('td:nth-child(' + flamIndex + ')').text();
  if (typeof varIndex !== 'undefined') star.variable = $el.find('td:nth-child(' + varIndex + ')').text();
  if (typeof draperIndex !== 'undefined') star.hDraper = $el.find('td:nth-child(' + draperIndex + ')').text();
  if (typeof hippIndex !== 'undefined') star.hipparcos = $el.find('td:nth-child(' + hippIndex + ')').text();
  if (typeof ascIndex !== 'undefined') star.ra = $el.find('td:nth-child(' + ascIndex + ')').text();
  if (typeof decIndex !== 'undefined') star.dec = $el.find('td:nth-child(' + decIndex + ')').text();
  if (typeof appIndex !== 'undefined') star.visMag = $el.find('td:nth-child(' + appIndex + ')').text();
  if (typeof absIndex !== 'undefined') star.absMag = $el.find('td:nth-child(' + absIndex + ')').text();
  if (typeof distIndex !== 'undefined') star.distLY = $el.find('td:nth-child(' + distIndex + ')').text();
  if (typeof specIndex !== 'undefined') star.spec = $el.find('td:nth-child(' + specIndex + ')').text();

  return star;
}).toArray();

c.pop();

var t = document.createElement('textarea');
document.body.insertBefore(t, document.body.firstChild);
t.value = JSON.stringify(c, null, 2);
t.style.height = '500px';