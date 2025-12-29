"use client"

import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Color, DirectionalLight, Mesh } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const Model = ({ url, height, width }: ModelProp) => {
    const geom = useLoader(STLLoader, url);
    const ref = useRef<Mesh>(null!);
    const { camera } = useThree();
    const lightRef = useRef<DirectionalLight>(null!);
    useFrame(() => {
        lightRef.current.position.set(camera.position.x, camera.position.y, camera.position.z);
    });
    useEffect(() => {
        ref.current.geometry.computeBoundingSphere();
        let scaleValue = (Math.max(height, width) * 7 / 8) / (ref.current.geometry.boundingSphere!.radius * 2);
        ref.current.scale.setScalar(scaleValue);
        camera.position.set(15, 15, ref.current.geometry.boundingSphere!.radius * scaleValue + 15);
    });

    return (
        <mesh ref={ref}>
            <primitive object={geom} attach="geometry" />
            <meshPhysicalMaterial color={new Color(27, 147, 136)} attach="material" clearcoat={1} reflectivity={1} />
            <OrbitControls enableDamping={false} enablePan={false} enableZoom={false} />
            <directionalLight ref={lightRef} intensity={0.006} />
        </mesh>
    );
};

export default function StlViewer({ url, className }: StlViewerProp) {
    const ref = useRef<HTMLDivElement>(null!);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }
    }, []);

    return (
        <div ref={ref} className={className}>
            <Canvas shadows orthographic>
                <Suspense >
                    <Model url={url} height={dimensions.height} width={dimensions.width} />
                </Suspense>
            </Canvas>
        </div>
    );
}

class ModelProp {
    width: number = 0;
    height: number = 0;
    url: string = "";
}

class StlViewerProp {
    url: string = "";
    className?: string
}




