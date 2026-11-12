import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Garment({color='#3A1F2B'}:{color?:string}) {
  const host = useRef<HTMLDivElement>(null);
  const [failed,setFailed]=useState(false);
  const [angle,setAngle]=useState(0);
  const angleRef=useRef(0);
  useEffect(()=>{angleRef.current=angle;},[angle]);
  useEffect(()=>{
    if(!host.current)return;
    const container=host.current;
    let renderer:THREE.WebGLRenderer;
    try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});}catch{setFailed(true);return;}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    container.prepend(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(32,1,.1,100);
    camera.position.set(0,.15,7.9);
    const group=new THREE.Group(); scene.add(group);
    const fabric=new THREE.MeshStandardMaterial({color,roughness:1});
    const rib=new THREE.MeshStandardMaterial({color:new THREE.Color(color).multiplyScalar(.77),roughness:1});
    const detail=new THREE.MeshStandardMaterial({color:'#DFEDFF',roughness:.8});
    function mesh(geometry:THREE.BufferGeometry,material:THREE.Material,x:number,y:number,z:number,rz=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.rotation.z=rz;group.add(m);return m;}
    // Concept geometry. Replace with the approved garment's scanned GLB before retail launch.
    const torso=mesh(new THREE.CylinderGeometry(.79,.72,1.55,64,12),fabric,0,-.08,0);torso.scale.z=.47;
    const shoulder=mesh(new THREE.SphereGeometry(.82,48,24),fabric,0,.56,0);shoulder.scale.set(1,.43,.48);
    for(const side of [-1,1]){
      const sleeve=mesh(new THREE.CylinderGeometry(.29,.23,1.47,32,8),fabric,side*.98,-.08,0,side*.37);sleeve.scale.z=.93;
      mesh(new THREE.CylinderGeometry(.24,.22,.17,32),rib,side*1.24,-.76,0,side*.37);
    }
    const hem=mesh(new THREE.CylinderGeometry(.73,.71,.18,64),rib,0,-.91,0);hem.scale.z=.47;
    const hood=mesh(new THREE.TorusGeometry(.405,.175,24,64,Math.PI*1.65),fabric,0,1.02,-.04);hood.rotation.z=-Math.PI*.325;hood.scale.set(1,1.13,.8);
    const hoodBack=mesh(new THREE.SphereGeometry(.48,32,24),fabric,0,1.05,-.19);hoodBack.scale.set(1,1.13,.45);
    const pocket=mesh(new THREE.BoxGeometry(.83,.4,.07,6,3),rib,0,-.48,.365);pocket.rotation.x=.02;
    for(const side of [-1,1])mesh(new THREE.CylinderGeometry(.013,.013,.45,8),detail,side*.17,.45,.41,side*.06);
    for(let i=0;i<16;i++){const stitch=mesh(new THREE.CylinderGeometry(.005,.005,.14,4),fabric,-.67+i*.09,-.91,.343);stitch.material=rib;}
    scene.add(new THREE.HemisphereLight('#f4f8ff','#655661',3));
    const key=new THREE.DirectionalLight('#ffffff',4);key.position.set(-3,4,5);scene.add(key);
    const rim=new THREE.DirectionalLight('#b9d7ff',4);rim.position.set(4,1,-3);scene.add(rim);
    const resize=new ResizeObserver(()=>{const {width,height}=container.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();});resize.observe(container);
    let dragging=false,lastX=0,rotation=angleRef.current,frame=0,visible=true;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;renderer.domElement.setPointerCapture(e.pointerId);};
    const move=(e:PointerEvent)=>{if(dragging){angleRef.current+=(e.clientX-lastX)*.012;lastX=e.clientX;}};
    const up=()=>{dragging=false;};
    renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(container);
    const start=performance.now();
    function render(){frame=requestAnimationFrame(render);if(!visible)return;rotation+=(angleRef.current-rotation)*.12;group.rotation.y=rotation-.18;group.rotation.z=-.045;group.position.y=reduced?0:Math.sin((performance.now()-start)*.0006)*.055;renderer.render(scene,camera);}render();
    return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();scene.traverse(object=>{if(object instanceof THREE.Mesh)object.geometry.dispose();});fabric.dispose();rib.dispose();detail.dispose();renderer.dispose();renderer.domElement.remove();};
  },[color]);
  return <div className="garment-wrap"><div ref={host} className="garment-canvas" role="img" aria-label="Interactive three dimensional hoodie concept. Use front and back buttons to rotate.">{failed&&<div className="garment-fallback">3D preview unavailable</div>}</div><div className="model-controls"><span>Drag to explore</span><button onClick={()=>setAngle(0)}>Front</button><button onClick={()=>setAngle(Math.PI)}>Back</button></div></div>;
}
