// PROGRAMME — عامل الخدمة: يحفظ التطبيق ليعمل بلا إنترنت.
// عند تعديل index.html غيّر رقم VERSION ليصل التحديث للهاتف.
const VERSION = "programme-26.0.0";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "ex/Ab_Roller-0.jpg", "ex/Ab_Roller-1.jpg", "ex/Barbell_Hip_Thrust-0.jpg", "ex/Barbell_Hip_Thrust-1.jpg", "ex/Barbell_Incline_Bench_Press_-_Medium_Grip-0.jpg", "ex/Barbell_Incline_Bench_Press_-_Medium_Grip-1.jpg", "ex/Barbell_Shrug-0.jpg", "ex/Barbell_Shrug-1.jpg", "ex/Cable_Rope_Overhead_Triceps_Extension-0.jpg", "ex/Cable_Rope_Overhead_Triceps_Extension-1.jpg", "ex/Cable_Seated_Lateral_Raise-0.jpg", "ex/Cable_Seated_Lateral_Raise-1.jpg", "ex/Decline_Dumbbell_Bench_Press-0.jpg", "ex/Decline_Dumbbell_Bench_Press-1.jpg", "ex/Dumbbell_Alternate_Bicep_Curl-0.jpg", "ex/Dumbbell_Alternate_Bicep_Curl-1.jpg", "ex/Dumbbell_Bench_Press-0.jpg", "ex/Dumbbell_Bench_Press-1.jpg", "ex/Dumbbell_Incline_Row-0.jpg", "ex/Dumbbell_Incline_Row-1.jpg", "ex/Dumbbell_Shoulder_Press-0.jpg", "ex/Dumbbell_Shoulder_Press-1.jpg", "ex/External_Rotation_with_Band-0.jpg", "ex/External_Rotation_with_Band-1.jpg", "ex/Face_Pull-0.jpg", "ex/Face_Pull-1.jpg", "ex/Farmers_Walk-0.jpg", "ex/Farmers_Walk-1.jpg", "ex/Flat_Bench_Lying_Leg_Raise-0.jpg", "ex/Flat_Bench_Lying_Leg_Raise-1.jpg", "ex/Goblet_Squat-0.jpg", "ex/Goblet_Squat-1.jpg", "ex/Hack_Squat-0.jpg", "ex/Hack_Squat-1.jpg", "ex/Hammer_Curls-0.jpg", "ex/Hammer_Curls-1.jpg", "ex/Leg_Press-0.jpg", "ex/Leg_Press-1.jpg", "ex/Pallof_Press-0.jpg", "ex/Pallof_Press-1.jpg", "ex/Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench-0.jpg", "ex/Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench-1.jpg", "ex/Pullups-0.jpg", "ex/Pullups-1.jpg", "ex/Romanian_Deadlift-0.jpg", "ex/Romanian_Deadlift-1.jpg", "ex/Seated_Bent-Over_Rear_Delt_Raise-0.jpg", "ex/Seated_Bent-Over_Rear_Delt_Raise-1.jpg", "ex/Seated_Cable_Rows-0.jpg", "ex/Seated_Cable_Rows-1.jpg", "ex/Seated_Calf_Raise-0.jpg", "ex/Seated_Calf_Raise-1.jpg", "ex/Seated_Leg_Curl-0.jpg", "ex/Seated_Leg_Curl-1.jpg", "ex/Single-Leg_Leg_Extension-0.jpg", "ex/Single-Leg_Leg_Extension-1.jpg", "ex/Standing_Calf_Raises-0.jpg", "ex/Standing_Calf_Raises-1.jpg", "ex/Triceps_Pushdown-0.jpg", "ex/Triceps_Pushdown-1.jpg", "ex/Triceps_Pushdown_-_Rope_Attachment-0.jpg", "ex/Triceps_Pushdown_-_Rope_Attachment-1.jpg", "ex/V-Bar_Pulldown-0.jpg", "ex/V-Bar_Pulldown-1.jpg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// الصفحة: الشبكة أولاً (لتصل التحديثات) ثم النسخة المحفوظة عند انقطاع الإنترنت.
// باقي الملفات: المحفوظ أولاً.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put("index.html", copy));
        return res;
      }).catch(() => caches.match("index.html"))
    );
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
