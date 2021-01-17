class Platform {

	set(platform: any);

	dispose();

}

const PLATFORM: Platform;
let $atob: any
let $window: any
let $document: any
let $XMLHttpRequest: any
let $OffscreenCanvas: any
let $HTMLCanvasElement: any
let $requestAnimationFrame: any

export {
	PLATFORM,
	$window,
	$document,
	$XMLHttpRequest,
	$atob,
	$OffscreenCanvas,
	$HTMLCanvasElement,
	$requestAnimationFrame,
};
