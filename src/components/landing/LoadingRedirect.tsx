export default function LoadingRedirect() {
  return (
    <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-5 text-center'>
      <h2 className='text-xl text-gray-800 mb-5 font-semibold'>외부 브라우저로 이동중입니다</h2>
      <p className='text-gray-600 leading-relaxed'>
        더 나은 서비스 이용을 위해
        <br />
        외부 브라우저로 이동합니다.
        <br />
        잠시만 기다려주세요...
      </p>
    </div>
  );
}
