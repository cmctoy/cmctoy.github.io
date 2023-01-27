var Example = Example || {};
window.onload = function () {
	var Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Events = Matter.Events,
		Composite = Matter.Composite,
		Composites = Matter.Composites,
		Common = Matter.Common,
		MouseConstraint = Matter.MouseConstraint,
		Mouse = Matter.Mouse,
		World = Matter.World,
		Vertices = Matter.Vertices,
		Svg = Matter.Svg,
		Bodies = Matter.Bodies,
		Body = Matter.Body,
		Constraint = Matter.Constraint,
		MouseConstraint = Matter.MouseConstraint;

	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var scale_number = 0.25;
	var carWidth = 100,
		carHeight = 60;
	var carfriction = 0.9,
		carfrictionAir = 0.008,
		carfrictionStatic = 0.1;

	var engine = Engine.create(),
		world = engine.world;
	world.gravity.y = 0;

	var render = Render.create({
		element: document.body,
		canvas: document.getElementById('car'),
		engine: engine,
		options: {
			width: winWidth,
			height: winHeight,
			background: 'white',
			showAngleIndicator: false,
			wireframes: false
		}
	});

	Render.run(render);
	Engine.run(render);
	// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);
	var car1number = 0,
		car2number = 0,
		car3number = 0,
		car4number = 0,
		car5number = 0,
		car6number = 6,
		car7number = 7,
		car8number = 8;
//	/*let*/var t1, t2;
	var tim = 100;
	setTimeout( function() {
		Events.on(engine, 'afterUpdate', function (event) {
			/*let*/var deltaTime = event.source.timing.timestamp;
			/*let*/var timeScale = event.source.timing.timeScale;
			/*let*/var bodies = Composite.allBodies(engine.world);
			// console.info(bodies);
			for (/*let*/var i = 0; i < bodies.length; i++) {
				/*let*/var body = bodies[i];
				Body.update(body, deltaTime, timeScale, 1);
				if (body.speed > 0 && body.speed < 0.01) {
					switch (body.label) {
						case 'car1':
							car1number++;
							if (car1number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car1number >= tim) {
								car1number = 0;
								/*let*/var b = _.find(bodies, { label: 'car1' });
								Matter.Composite.remove(world, b);
							}
							break;
						case 'car2':
							car2number++;
							if (car2number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car2number >= tim) {
								car2number = 0;
								/*let*/var b = _.find(bodies, { label: 'car2' });
								Matter.Composite.remove(world, b);
							}
							break;
						case 'car3':
							car3number++;
							if (car3number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car3number >= tim) {
								car3number = 0;
								/*let*/var b = _.find(bodies, { label: 'car3' });
								Matter.Composite.remove(world, b);
							}
							break;
						case 'car4':
							car4number++;
							if (car4number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car4number >= tim) {
								car4number = 0;
								/*let*/var b = _.find(bodies, { label: 'car4' });
								Matter.Composite.remove(world, b);
							}
							break;
							case 'car5':
							car5number++;
							if (car5number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car5number >= tim) {
								car5number = 0;
								/*let*/var b = _.find(bodies, { label: 'car5' });
								Matter.Composite.remove(world, b);
							}
							break;
							case 'car6':
							car6number++;
							if (car6number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car6number >= tim) {
								car6number = 0;
								/*let*/var b = _.find(bodies, { label: 'car6' });
								Matter.Composite.remove(world, b);
							}
							break;
							case 'car7':
							car7number++;
							if (car7number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car7number >= tim) {
								car7number = 0;
								/*let*/var b = _.find(bodies, { label: 'car7' });
								Matter.Composite.remove(world, b);
							}
							break;
							case 'car8':
							car8number++;
							if (car8number > 0 && !body.render.opacity <= 0.02 && body.speed > 0)
								body.render.opacity = body.render.opacity - 0.01;
							if (car8number >= tim) {
								car8number = 0;
								/*let*/var b = _.find(bodies, { label: 'car8' });
								Matter.Composite.remove(world, b);
							}
							break;
					}
				} else if (body.speed > 1) {
					body.render.opacity = 1;
				}
				if (body.position.x < -100 || body.position.y < -100 || body.position.x > winWidth || body.position.y > winHeight) {
					Matter.Composite.remove(world, body);

				}
			}
		});
	}, 1000);

	Events.on(engine, 'collisionStart', function (event) {
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			if (pair.bodyA.label != 'logo' && pair.bodyB.label != 'logo') {
				if (pair.bodyA.label != 'logo')
					pair.bodyA.frictionAir = 0.04;
				if (pair.bodyB.label != 'logo')
					pair.bodyB.frictionAir = 0.04;
			}
		}
	});

	Events.on(world, "afterRemove", function(event) {
		/*let*/var bodies = Composite.allBodies(engine.world);
		/*let*/var body = event.object;
		body.render.opacity = 0;
		/*let*/var position = getPosition();
		/*let*/var angle = getAngle(position);
		// if (bodies.length < 6) {
		/*let*/var car = Bodies.rectangle(position.x, position.y, carWidth, carHeight, {
			frictionAir: carfrictionAir,
			frictionStatic: carfrictionStatic,
			restitution: 0.5,
			label: body.label,
			angle: angle,
			sSensor: true,
			render: {
				strokeStyle: '#ffffff',
				visible: true,
				opacity: 0,
				sprite: {
					texture: body.render.sprite.texture,
					xScale: scale_number,
					yScale: scale_number
				}
			}
		})
		cars.push(car)
		setTimeout( function() {
//			World.add(world, car);
		}, 1000);
		// }
	})

	Events.on(world, 'afterAdd', function(event) {
		/*let*/var body = event.object;
		if (body instanceof Array) {
			body.forEach(function(ele) {
				if (ele.type == 'body')
					emit(ele);
			});
		} else if (body instanceof Object && body.type == 'body') {
			emit(body);
		}
	});

	var emit = function(body) {
		/*let*/var i = 0;
		/*let*/var interval = setInterval(function() {
			if (i < 200) {
				i++;
				body.render.opacity = body.render.opacity + 0.005;
			} else {
				clearInterval(interval);
				/*let*/var random = (Common.random()) / 4 + 0.1;
				body.render.opacity = 1;
				Body.applyForce(body, body.position, {
					x: - Math.cos(body.angle) * 0.02,
					y: -Math.sin(body.angle) * 0.02,
				});
				setTimeout( function() {
					body.frictionAir = carfrictionAir;
					Body.applyForce(body, body.position, {
						x: Math.cos(body.angle) * 0.3,
						y: Math.sin(body.angle) * 0.3,
					});
				}, 1000);
			}
		}, 10);
		// setTimeout( function() {
		//	 /*let*/var random = (Common.random()) / 4 + 0.1;
		//	 Body.applyForce(body, body.position, {
		//		 x: - Math.cos(body.angle) * 0.2,
		//		 y: -Math.sin(body.angle) * 0.2,
		//	 });

		//	 setTimeout( function() {
		//		 Body.applyForce(body, body.position, {
		//			 x: Math.cos(body.angle) * 1,
		//			 y: Math.sin(body.angle) * 1,
		//		 });
		//	 }, 1000);
		// }, 500);

	}

	/*let*/var num = parseInt(Math.random() * 3 + 1, 10);
	/*let*/var sideWidth = 70;
	/*let*/var sideRange = 180;
	function getPosition() {
		/*let*/var x, y;
		switch (num) {
			case 1:
				x = Common.random() * winWidth / 3 + sideWidth;
				y = Common.random() * winHeight / 2 + sideWidth;
				while (x > sideRange && y > sideRange) {
					x = Common.random() * winWidth / 3 + sideWidth;
					y = Common.random() * winHeight / 2 + sideWidth;
				}
				break;
			case 2:
				x = winWidth - Common.random() * winWidth / 3 - sideWidth;
				y = Common.random() * winHeight / 2 + sideWidth;
				while (x < winWidth - sideRange && y > sideRange) {
					x = winWidth - Common.random() * winWidth / 3 - sideWidth;
					y = Common.random() * winHeight / 2 + sideWidth;
				}
				break;
			case 3:
				x = Common.random() * winWidth / 3 + sideWidth;
				y = winHeight - Common.random() * 2 - sideWidth;
				while (x > sideRange && y < winHeight - sideRange) {
					x = Common.random() * winWidth / 3 + sideWidth;
					y = winHeight - Common.random() * 2 - sideWidth;
				}
				break;
			case 4:
				x = winWidth - Common.random() * winWidth / 3 - sideWidth;
				y = winHeight - Common.random() * winHeight / 2 - sideWidth;
				while (x < winWidth - sideRange && y < winHeight - sideRange) {
					x = winWidth - Common.random() * winWidth / 3 - sideWidth;
					y = winHeight - Common.random() * winHeight / 2 - sideWidth;
				}
				break;
			case 5:
				x = winWidth - Common.random() * winWidth / 3 - sideWidth;
				y = winHeight - Common.random() * winHeight / 2 - sideWidth;
				while (x < winWidth - sideRange && y < winHeight - sideRange) {
					x = winWidth - Common.random() * winWidth / 3 - sideWidth;
					y = winHeight - Common.random() * winHeight / 2 - sideWidth;
				}
				break;
		}

		// /*let*/var x = Common.random() * (winWidth - 100) + 50;
		// /*let*/var y = Common.random() * (winHeight - 100) + 50;
		// /*let*/var range = 200;
		// /*let*/var bodies = Composite.allBodies(engine.world);
		// while (x > range && x < winWidth - range && y > range && y < winHeight - range) {
		//	 x = Common.random() * (winWidth - 200) + 100;
		//	 y = Common.random() * (winHeight - 200) + 100;

		// }
		if (num < 4) {
			num++;
		} else {
			num = parseInt(Math.random() * 2 + 1, 10);
		}
		return { x: x, y: y }
	}

	function getpoint() {
		/*let*/var x = parseInt(Math.random() * 400 + winWidth - 200, 10);
		/*let*/var y = parseInt(Math.random() * 200 + winWidth - 100, 10);
		return { x: x, y: y }
	}

	function getAngle(p) {
		if (p.x <= winWidth / 2) {
			if (p.y <= winHeight / 2)
				return Math.random() * Math.PI / 3;
			else
				return Math.random() * (Math.PI) / 4 + (Math.PI) * 7 / 4;
		}
		else if (p.x > winWidth / 2) {
			if (p.y < winHeight / 2)
				return Math.random() * Math.PI / 4 + Math.PI * 3 / 4;
			else
				return Math.random() * Math.PI / 4 + Math.PI;
		}
	}

	world.bodies = [];
	var car1p = getPosition(),
		car2p = getPosition(),
		car3p = getPosition(),
		car4p = getPosition(),
		car5p = getPosition(),
		car6p = getPosition(),
		car7p = getPosition(),
		car8p = getPosition(),
		
		angle1 = getAngle(car1p),
		angle2 = getAngle(car2p),
		angle3 = getAngle(car3p),
		angle4 = getAngle(car4p),
		angle5 = getAngle(car5p),
		angle6 = getAngle(car6p),
		angle7 = getAngle(car7p),
		angle8 = getAngle(car8p);
		
//	console.info(car2p, angle2, '-------');

	var car1 = Bodies.rectangle(car1p.x, car1p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		id: 11,
		label: 'car1',
		restitution: 0.5,
		angle: angle1,
		sSensor: true,
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/1.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car2 = Bodies.rectangle(car2p.x, car2p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		id: 12,
		label: 'car2',
		restitution: 0.5,
		angle: angle2,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/2.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car3 = Bodies.rectangle(car3p.x, car3p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		di: 13,
		label: 'car3',
		angle: angle3,
		restitution: 0.5,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/3.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car4 = Bodies.rectangle(car4p.x, car4p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		di: 14,
		label: 'car4',
		angle: angle4,
		restitution: 0.5,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/4.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car5 = Bodies.rectangle(car5p.x, car5p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		di: 15,
		label: 'car5',
		angle: angle5,
		restitution: 0.5,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/5.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car6 = Bodies.rectangle(car6p.x, car6p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		di: 16,
		label: 'car6',
		angle: angle6,
		restitution: 0.5,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/6.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car7 = Bodies.rectangle(car7p.x, car7p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		di: 17,
		label: 'car7',
		angle: angle7,
		restitution: 0.5,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/7.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var car8 = Bodies.rectangle(car8p.x, car8p.y, carWidth, carHeight, {
		friction: carfriction,
		frictionAir: carfrictionAir,
		frictionStatic: carfrictionStatic,
		di: 18,
		label: 'car8',
		angle: angle8,
		restitution: 0.5,
		sSensor: true,
		collisionFilter: {
			mask: 0x0001
		},
		render: {
			opacity: 0,
			strokeStyle: '#ffffff',
			sprite: {
				texture: './matter/png/8.png',
				xScale: scale_number,
				yScale: scale_number
			}
		}
	});
	var logo = Bodies.rectangle(winWidth / 2, winHeight / 3, 224, 300, {
		di: 20,
		label: 'logo',
		isStatic: true,
		isSensor: true,
		frictionAir: 0,
		collisionFilter: {
			category: 0x00032,
		},
		render: {
			sprite: {
				texture: './asset/img/logo.png',
				// xScale: scale_number,
				// yScale: scale_number
			}
		}
	});

	World.add(world, logo);
	var index = 0;
	var cars = [car1, car2, car3, car4, car5, car6, car7, car8];
	var inter = setInterval(function() {
		if (cars.length > 4) {
			World.add(world, cars.shift()); // Math.round(8*Math.random())
			index++;
		}
	}, 1000);

	// World.add(world, [
	//	 logo, car1, car2, car3, car4
	// ]);

	// add mouse control
	// var mouse = Mouse.create(render.canvas),
	//	 mouseConstraint = MouseConstraint.create(engine, {
	//		 mouse: mouse,
	//		 constraint: {
	//			 stiffness: 0.2,
	//			 render: {
	//				 visible: false
	//			 }
	//		 }
	//	 });

	// World.add(world, mouseConstraint);

	// keep the mouse in sync with rendering
	// render.mouse = mouse;

	// fit the render viewport to the scene
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: winWidth, y: winHeight }
	});

}