import { oimo } from './OimoPhysics.js';

// dynamics
const World = oimo.dynamics.World;
const RigidBodyType = oimo.dynamics.rigidbody.RigidBodyType;
const RigidBodyConfig = oimo.dynamics.rigidbody.RigidBodyConfig;
const ShapeConfig = oimo.dynamics.rigidbody.ShapeConfig;
const RigidBody = oimo.dynamics.rigidbody.RigidBody;
const Shape = oimo.dynamics.rigidbody.Shape;
const SphericalJoint = oimo.dynamics.constraint.joint.SphericalJoint;
const RevoluteJointConfig = oimo.dynamics.constraint.joint.RevoluteJointConfig;
const UniversalJointConfig = oimo.dynamics.constraint.joint.UniversalJointConfig;
const CylindricalJoint = oimo.dynamics.constraint.joint.CylindricalJoint;
const PrismaticJoint = oimo.dynamics.constraint.joint.PrismaticJoint;
const PrismaticJointConfig = oimo.dynamics.constraint.joint.PrismaticJointConfig;
const RevoluteJoint = oimo.dynamics.constraint.joint.RevoluteJoint;
const RagdollJoint = oimo.dynamics.constraint.joint.RagdollJoint;
const CylindricalJointConfig = oimo.dynamics.constraint.joint.CylindricalJointConfig;
const SphericalJointConfig = oimo.dynamics.constraint.joint.SphericalJointConfig;
const RagdollJointConfig = oimo.dynamics.constraint.joint.RagdollJointConfig;
const SpringDamper = oimo.dynamics.constraint.joint.SpringDamper;
const TranslationalLimitMotor = oimo.dynamics.constraint.joint.TranslationalLimitMotor;
const RotationalLimitMotor = oimo.dynamics.constraint.joint.RotationalLimitMotor;
const UniversalJoint = oimo.dynamics.constraint.joint.UniversalJoint;

// common
const Vec3 = oimo.common.Vec3;
const Quat = oimo.common.Quat;
const Mat3 = oimo.common.Mat3;
const MathUtil = oimo.common.MathUtil;
const Transform = oimo.common.Transform;

// collision
const OCapsuleGeometry = oimo.collision.geometry.CapsuleGeometry;
const OConvexHullGeometry = oimo.collision.geometry.ConvexHullGeometry;
const OBoxGeometry = oimo.collision.geometry.BoxGeometry;
const OSphereGeometry = oimo.collision.geometry.SphereGeometry;
const OCylinderGeometry = oimo.collision.geometry.CylinderGeometry;
const OConeGeometry = oimo.collision.geometry.ConeGeometry;
const OGeometry = oimo.collision.geometry.Geometry;

// callback
const RayCastClosest = oimo.dynamics.callback.RayCastClosest;

export { CylindricalJoint, CylindricalJointConfig, Mat3, MathUtil, OBoxGeometry, OCapsuleGeometry, OConeGeometry, OConvexHullGeometry, OCylinderGeometry, OGeometry, OSphereGeometry, PrismaticJoint, PrismaticJointConfig, Quat, RagdollJoint, RagdollJointConfig, RayCastClosest, RevoluteJoint, RevoluteJointConfig, RigidBody, RigidBodyConfig, RigidBodyType, RotationalLimitMotor, Shape, ShapeConfig, SphericalJoint, SphericalJointConfig, SpringDamper, Transform, TranslationalLimitMotor, UniversalJoint, UniversalJointConfig, Vec3, World };
