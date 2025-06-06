# Force

## Modeling a force

힘(Force)은 물체의 운동 상태를 변화시키는 물리적 요소입니다. 뉴턴의 제2법칙(F = ma)에 따라 힘은 물체의 가속도를 결정합니다.

### Friction (마찰력)

```txt
F_friction = -μ * N * v̂
```

마찰력은 물체가 움직이는 동안 지속적으로 작용하는 힘으로, 물체의 운동을 방해합니다.

- **적용 시점**: 물체가 움직이는 동안 지속적으로 적용됩니다.
- **방향**: 항상 물체의 운동 방향과 반대 방향으로 작용합니다.
- **크기**: 일반적으로 수직항력(N)과 마찰계수(μ)의 곱으로 계산됩니다. F = μ * N
- **효과**: 물체의 속도를 점진적으로 감소시킵니다.

**코드 구현**:

```typescript
// 마찰력 계산
const friction = velocity.copy();
friction.normalize();
friction.mult(-1);
friction.mult(frictionCoefficient);
applyForce(friction);
```

### Bounce (반발)

반발은 물체가 다른 물체나 경계에 충돌할 때 발생하는 일시적인 현상입니다.

- **적용 시점**: 물체가 경계나 다른 물체와 충돌하는 순간에만 적용됩니다.
- **방향**: 충돌 표면에 수직인 방향으로 속도 성분이 반전됩니다.
- **크기**: 반발 계수(coefficient of restitution)에 의해 결정됩니다. 예: bounce = -0.9
- **효과**: 충돌 후 물체의 속도 방향을 바꾸고, 에너지 손실을 모델링합니다.

**코드 구현**:

```typescript
// 바닥과 충돌 시
if (position.y > height - radius) {
  position.y = height - radius;
  velocity.y *= bounce; // bounce = -0.9 (10% 에너지 손실)
}
```

### 마찰력과 반발의 차이점

1. **작용 시점**:
   - 마찰력: 물체가 움직이는 동안 지속적으로 작용
   - 반발: 충돌 순간에만 일시적으로 작용

2. **물리적 의미**:
   - 마찰력: 표면 간의 상호작용으로 인한 운동 저항
   - 반발: 충돌 시 에너지 보존/손실을 나타냄

3. **구현 방식**:
   - 마찰력: 속도 방향의 반대 방향으로 힘을 적용
   - 반발: 속도 성분에 반발 계수를 곱함

4. **결과적 효과**:
   - 마찰력: 물체를 점진적으로 느리게 만듦
   - 반발: 물체의 방향을 바꾸고 에너지를 감소시킴
