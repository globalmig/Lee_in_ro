import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 | 미래신용정보",
  description: "미래신용정보 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white pt-20">
      <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">개인정보처리방침</h1>
            <p className="mt-2 text-sm text-gray-500">시행일: 2026-01-19</p>
          </div>

          <Link href="/" className="text-sm font-semibold text-[#C40452] hover:underline">
            홈으로
          </Link>
        </div>

        <section className="mt-10 space-y-10 text-[15px] leading-7 text-gray-800">
          <p>미래신용정보(이하 “회사”)는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 아래와 같이 개인정보처리방침을 수립·공개합니다.</p>

          <div>
            <h2 className="text-lg font-bold text-gray-900">1. 수집하는 개인정보 항목</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>필수: 이름, 전화번호, 문의 내용</li>
              <li>선택: 이메일(문의 회신을 이메일로 받는 경우)</li>
              <li>자동 수집(서비스 이용 과정): IP 주소, 접속 로그, 쿠키, 기기/브라우저 정보(통계 및 보안 목적)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">2. 개인정보 수집 및 이용 목적</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>상담 신청 접수 및 처리, 문의에 대한 답변 제공</li>
              <li>서비스 품질 개선 및 고객 응대 이력 관리</li>
              <li>법령 준수 및 분쟁 대응, 보안/부정 이용 방지</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">3. 보유 및 이용기간</h2>
            <p className="mt-3">
              회사는 개인정보 수집·이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 아래와 같이 보관할 수 있습니다.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>상담/문의 내역: 목적 달성 후 1년 보관(분쟁 대응 및 서비스 개선 목적)</li>
              <li>접속 로그 등: 3개월 보관(통신비밀보호법 등 관련 법령에 따른 보관)</li>
              <li>관계 법령에 따라 보관이 필요한 경우: 해당 법령에서 정한 기간</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">※ 실제 운영 정책에 맞게 “보관기간”은 조정해 주세요.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">4. 개인정보의 제3자 제공</h2>
            <p className="mt-3">회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자의 사전 동의가 있거나 법령에 근거가 있는 경우에 한하여 제공할 수 있습니다.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">5. 개인정보 처리의 위탁</h2>
            <p className="mt-3">회사는 원활한 서비스 제공을 위해 개인정보 처리업무를 외부에 위탁할 수 있으며, 위탁 시 관련 법령에 따라 안전하게 관리·감독합니다.</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">수탁업체</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">위탁업무 내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">호스팅/플랫폼 제공사</td>
                    <td className="border border-gray-200 px-4 py-3">웹사이트 운영 및 데이터 보관</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">이메일 발송 서비스(사용 시)</td>
                    <td className="border border-gray-200 px-4 py-3">문의 답변/알림 메일 발송</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500">※ 실제 사용하는 업체명으로 교체해 주세요.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">6. 정보주체의 권리 및 행사 방법</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>개인정보 열람, 정정, 삭제, 처리정지 요구</li>
              <li>동의 철회 및 상담/문의 내역 삭제 요청</li>
              <li>권리 행사는 아래 “개인정보 보호책임자”에게 서면/이메일로 요청할 수 있으며, 회사는 지체 없이 조치합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">7. 개인정보의 파기 절차 및 방법</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>파기절차: 목적 달성 후 별도 보관 기간이 경과하면 즉시 파기</li>
              <li>파기방법: 전자적 파일은 복구 불가한 방법으로 삭제, 종이는 분쇄 또는 소각</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">8. 개인정보의 안전성 확보 조치</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>개인정보 접근 권한 최소화 및 접근 통제</li>
              <li>전송/저장 구간 암호화 적용(가능 범위 내)</li>
              <li>접속기록 보관 및 위·변조 방지</li>
              <li>보안 업데이트 및 취약점 점검</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">9. 쿠키(Cookie) 사용</h2>
            <p className="mt-3">회사는 서비스 개선 및 이용 통계 분석을 위해 쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">10. 개인정보 보호책임자</h2>
            <div className="mt-3 rounded-lg border border-gray-200 p-4 text-sm leading-6">
              <p className="font-semibold text-gray-900">개인정보 보호책임자</p>
              <p>담당자: 이인로 부장</p>
              <p>연락처: 02-3451-9734</p>
              <p>이메일: 232237@mirae22.co.kr</p>
              <p className="mt-2 text-gray-500">※ 실제 운영 정보로 변경해 주세요.</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">11. 고지의 의무</h2>
            <p className="mt-3">본 개인정보처리방침은 법령/정책 변경 또는 회사 내부 방침 변경에 따라 개정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
