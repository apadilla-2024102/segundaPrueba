// Liquid olive/bronze field with a refracting glass sphere, rendered in WebGL.
(function () {
  var canvas = document.getElementById('hero-canvas');
  var hero = canvas && canvas.parentElement;
  if (!canvas) return;
  var gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: true });
  if (!gl) { hero.classList.add('no-webgl'); return; }

  var vert = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var frag = [
    'precision highp float;',
    'uniform vec2 r;uniform float t;',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
    ' return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*1.9+vec2(1.7,9.2);a*=.42;}return v;}',
    // Domain-warped field mapped to dark → olive → bronze bands
    'vec3 field(vec2 p){',
    ' p*=vec2(.9,1.25);',
    ' vec2 q=vec2(fbm(p+vec2(0.,t*.04)),fbm(p+vec2(5.2,1.3)-t*.03));',
    ' vec2 w=vec2(fbm(p+2.2*q+vec2(1.7,9.2)+t*.025),fbm(p+2.2*q+vec2(8.3,2.8)));',
    ' float f=fbm(p+2.*w);',
    ' float b=sin(f*11.+p.y*1.6+p.x*.7-t*.12)*.5+.5;',
    ' vec3 ink=vec3(.025,.03,.025);',
    ' vec3 olive=vec3(.32,.37,.29);',
    ' vec3 bronze=vec3(.80,.56,.31);',
    ' vec3 c=mix(ink,olive,smoothstep(.25,.75,b));',
    ' c=mix(c,bronze,smoothstep(.72,.98,b)*smoothstep(.4,.7,w.x));',
    ' c=mix(c,ink,smoothstep(.55,.85,f)*.5);',
    ' return c;}',
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy-.5*r)/r.y;',
    ' float asp=r.x/r.y;',
    ' vec2 C=vec2(min(.23*asp,.55),.3);',
    ' float R=asp<1.?.34:.5;',
    ' vec2 d=p-C;float l=length(d)/R;',
    ' vec3 col=field(p);',
    // Glass sphere: inverted, magnified sample inside with a bright fresnel rim
    ' if(l<1.04){',
    '  float z=sqrt(max(1.-l*l,0.));',
    '  vec2 rp=C-d*(.55+.35*z)+vec2(.08,-.05);',
    '  vec3 g=field(rp*1.15+vec2(.4,.2))*1.1;',
    '  float rim=pow(l,10.);',
    '  g+=field(p*.9+vec2(.3))*rim*1.4;',
    '  g*=mix(.85,1.,z);',
    '  float inner=smoothstep(.93,.985,l)*(1.-smoothstep(.985,1.,l));',
    '  g=mix(g,g*.35,inner*.6);',
    '  col=mix(col,g,smoothstep(1.,.992,l));',
    ' }',
    // Vignette, bottom fade and film grain
    ' vec2 uv=gl_FragCoord.xy/r;',
    ' col*=.55+.45*smoothstep(0.,.35,uv.y);',
    ' col*=1.-.35*length(uv-vec2(.5,.55));',
    ' col+=(h(gl_FragCoord.xy+fract(t))-.5)*.035;',
    ' gl_FragColor=vec4(col,1.);}'
  ].join('\n');

  function sh(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  var prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
  } catch (e) { hero.classList.add('no-webgl'); return; }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uR = gl.getUniformLocation(prog, 'r');
  var uT = gl.getUniformLocation(prog, 't');

  // Soft image: render below native resolution to keep it cheap
  var SCALE = 0.6;
  function resize() {
    var w = Math.round(canvas.clientWidth * SCALE), hgt = Math.round(canvas.clientHeight * SCALE);
    if (canvas.width !== w || canvas.height !== hgt) {
      canvas.width = w; canvas.height = hgt;
      gl.viewport(0, 0, w, hgt);
    }
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible = true, raf = 0, start = performance.now();
  function draw(now) {
    resize();
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.uniform1f(uT, 12 + (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduced && visible) raf = requestAnimationFrame(draw);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      if (visible && !reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    }).observe(hero);
  }
  window.addEventListener('resize', function () { if (reduced) draw(performance.now()); });
  raf = requestAnimationFrame(draw);
})();
